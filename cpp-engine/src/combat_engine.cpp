#include "combat_engine.h"
#include <cmath>
#include <cstdlib>
#include <algorithm>

namespace {
    float g_arena_radius = 12.0f;
    float g_parry_window = 0.070f; // 70ms
    float g_hit_stop_duration = 0.050f; // 50ms
    
    Entity g_entities[2]; // 0: Player, 1: AI / Opponent
    
    float g_hit_stop_timer = 0.0f;
    int g_hit_stop_active = 0;
    
    int g_ult_active = 0;
    float g_ult_timer = 0.0f;
    float g_ult_duration = 2.0f;
    float g_ult_origin_x = 0.0f;
    float g_ult_origin_z = 0.0f;
    
    float g_last_parry_ms = 0.0f;
    int g_last_event = EVENT_NONE;
    
    const float ATTACK_RANGE = 2.2f;
    const float ATTACK_DURATION = 0.35f;
    const float PARRY_DURATION = 0.25f;
    const float STAGGER_DURATION = 1.0f;
    const float MOVE_SPEED = 6.5f;

    // Continuous float buffer for fast JS/WASM interop (32 floats)
    float g_state_buffer[32];
}

extern "C" {

void engine_init(float arena_radius, float parry_window_ms, float hit_stop_ms) {
    g_arena_radius = arena_radius > 0 ? arena_radius : 12.0f;
    g_parry_window = parry_window_ms > 0 ? (parry_window_ms / 1000.0f) : 0.070f;
    g_hit_stop_duration = hit_stop_ms > 0 ? (hit_stop_ms / 1000.0f) : 0.050f;
    engine_reset();
}

void engine_reset() {
    // Player
    g_entities[0].x = 0.0f;
    g_entities[0].y = 0.0f;
    g_entities[0].z = 4.5f;
    g_entities[0].vx = 0.0f;
    g_entities[0].vy = 0.0f;
    g_entities[0].vz = 0.0f;
    g_entities[0].rotation = 3.14159f; // Facing North
    g_entities[0].health = 100.0f;
    g_entities[0].stamina = 100.0f;
    g_entities[0].state = STATE_IDLE;
    g_entities[0].state_timer = 0.0f;
    g_entities[0].ult_charge = 0.0f;

    // AI Opponent
    g_entities[1].x = 0.0f;
    g_entities[1].y = 0.0f;
    g_entities[1].z = -4.5f;
    g_entities[1].vx = 0.0f;
    g_entities[1].vy = 0.0f;
    g_entities[1].vz = 0.0f;
    g_entities[1].rotation = 0.0f; // Facing South
    g_entities[1].health = 100.0f;
    g_entities[1].stamina = 100.0f;
    g_entities[1].state = STATE_IDLE;
    g_entities[1].state_timer = 0.0f;
    g_entities[1].ult_charge = 0.0f;

    g_hit_stop_active = 0;
    g_hit_stop_timer = 0.0f;
    g_ult_active = 0;
    g_ult_timer = 0.0f;
    g_last_event = EVENT_NONE;
}

int engine_update(float dt, int player_action, float player_move_x, float player_move_z, int ai_action, float ai_move_x, float ai_move_z) {
    g_last_event = EVENT_NONE;

    // Handle Hit-Stop freeze
    if (g_hit_stop_active) {
        g_hit_stop_timer -= dt;
        if (g_hit_stop_timer <= 0.0f) {
            g_hit_stop_active = 0;
            g_hit_stop_timer = 0.0f;
        } else {
            // World is frozen during hit-stop
            return g_last_event;
        }
    }

    // Handle Ult Animation progression
    if (g_ult_active) {
        g_ult_timer += dt;
        if (g_ult_timer >= g_ult_duration) {
            g_ult_active = 0;
            g_ult_timer = 0.0f;
        }
    }

    // Regenerate stamina
    for (int i = 0; i < 2; ++i) {
        if (g_entities[i].state == STATE_IDLE || g_entities[i].state == STATE_MOVE) {
            g_entities[i].stamina = std::min(100.0f, g_entities[i].stamina + 25.0f * dt);
        }
    }

    // --- 1. Player State Processing ---
    Entity& p = g_entities[0];
    if (p.state == STATE_ATTACK || p.state == STATE_PARRY || p.state == STATE_STAGGERED) {
        p.state_timer -= dt;
        if (p.state_timer <= 0.0f) {
            p.state = STATE_IDLE;
        }
    } else {
        if (player_action == STATE_ATTACK && p.stamina >= 20.0f) {
            p.state = STATE_ATTACK;
            p.state_timer = ATTACK_DURATION;
            p.stamina -= 20.0f;
        } else if (player_action == STATE_PARRY && p.stamina >= 15.0f) {
            p.state = STATE_PARRY;
            p.state_timer = PARRY_DURATION;
            p.stamina -= 15.0f;
        } else if (player_action == STATE_BLOCK) {
            p.state = STATE_BLOCK;
        } else if (std::abs(player_move_x) > 0.01f || std::abs(player_move_z) > 0.01f) {
            p.state = STATE_MOVE;
            p.x += player_move_x * MOVE_SPEED * dt;
            p.z += player_move_z * MOVE_SPEED * dt;
            p.rotation = std::atan2(player_move_x, player_move_z);
        } else {
            p.state = STATE_IDLE;
        }
    }

    // --- 2. AI Opponent State Processing (Autonomous if not overridden) ---
    Entity& ai = g_entities[1];
    float dx = p.x - ai.x;
    float dz = p.z - ai.z;
    float dist = std::sqrt(dx * dx + dz * dz);
    ai.rotation = std::atan2(dx, dz);

    if (ai.state == STATE_ATTACK || ai.state == STATE_STAGGERED) {
        ai.state_timer -= dt;
        if (ai.state_timer <= 0.0f) {
            ai.state = STATE_IDLE;
        }
    } else {
        // AI Logic: Approach player and attack within range
        if (dist > ATTACK_RANGE - 0.2f) {
            ai.state = STATE_MOVE;
            ai.x += (dx / dist) * (MOVE_SPEED * 0.75f) * dt;
            ai.z += (dz / dist) * (MOVE_SPEED * 0.75f) * dt;
        } else {
            // Close range: AI attacks periodically
            if (ai.stamina >= 25.0f && (std::rand() % 40 == 0)) {
                ai.state = STATE_ATTACK;
                ai.state_timer = ATTACK_DURATION;
                ai.stamina -= 20.0f;
            } else {
                ai.state = STATE_IDLE;
            }
        }
    }

    // --- 3. Collision, Hit, and Parry Detection ---
    if (dist <= ATTACK_RANGE) {
        // A. AI is attacking -> Check if player parried or blocked
        if (ai.state == STATE_ATTACK && ai.state_timer >= (ATTACK_DURATION - 0.12f)) {
            if (p.state == STATE_PARRY && (PARRY_DURATION - p.state_timer) <= g_parry_window) {
                // PERFECT PARRY!
                g_last_parry_ms = (PARRY_DURATION - p.state_timer) * 1000.0f;
                g_hit_stop_active = 1;
                g_hit_stop_timer = g_hit_stop_duration;
                
                ai.state = STATE_STAGGERED;
                ai.state_timer = STAGGER_DURATION;
                
                // Parry knockback on AI
                ai.x -= (dx / dist) * 1.5f;
                ai.z -= (dz / dist) * 1.5f;
                
                p.ult_charge = std::min(100.0f, p.ult_charge + 40.0f);
                g_last_event = EVENT_PERFECT_PARRY;
            } else if (p.state == STATE_BLOCK) {
                // Normal Block
                p.stamina = std::max(0.0f, p.stamina - 15.0f);
                p.x += (dx / dist) * 0.5f;
                p.z += (dz / dist) * 0.5f;
                g_last_event = EVENT_BLOCK;
            } else if (p.state != STATE_STAGGERED) {
                // Player takes hit
                p.health = std::max(0.0f, p.health - 12.0f);
                p.state = STATE_STAGGERED;
                p.state_timer = 0.3f;
                p.x += (dx / dist) * 1.2f;
                p.z += (dz / dist) * 1.2f;
                g_last_event = EVENT_HIT;
            }
        }

        // B. Player is attacking -> Check if AI gets hit
        if (p.state == STATE_ATTACK && p.state_timer >= (ATTACK_DURATION - 0.12f)) {
            if (ai.state != STATE_STAGGERED) {
                ai.health = std::max(0.0f, ai.health - 18.0f);
                ai.state = STATE_STAGGERED;
                ai.state_timer = 0.4f;
                ai.x -= (dx / dist) * 1.5f;
                ai.z -= (dz / dist) * 1.5f;
                p.ult_charge = std::min(100.0f, p.ult_charge + 20.0f);
                g_last_event = EVENT_HIT;
            }
        }
    }

    // --- 4. Ring Boundary Check (Circular Arena Knockout) ---
    for (int i = 0; i < 2; ++i) {
        float r = std::sqrt(g_entities[i].x * g_entities[i].x + g_entities[i].z * g_entities[i].z);
        if (r > g_arena_radius) {
            g_entities[i].state = STATE_KNOCKED_OUT;
            g_entities[i].health = 0.0f;
            g_last_event = EVENT_RING_KNOCKOUT;
        }
    }

    return g_last_event;
}

int engine_trigger_ult(int entity_id) {
    if (entity_id >= 0 && entity_id < 2) {
        Entity& e = g_entities[entity_id];
        if (e.ult_charge >= 100.0f) {
            e.ult_charge = 0.0f;
            e.state = STATE_ULT;
            e.state_timer = 1.5f;

            g_ult_active = 1;
            g_ult_timer = 0.0f;
            g_ult_origin_x = e.x;
            g_ult_origin_z = e.z;

            // Damage opponent if nearby and push them back
            int target_id = 1 - entity_id;
            Entity& target = g_entities[target_id];
            float dx = target.x - e.x;
            float dz = target.z - e.z;
            float dist = std::sqrt(dx * dx + dz * dz);
            if (dist < 6.0f) {
                target.health = std::max(0.0f, target.health - 40.0f);
                target.state = STATE_STAGGERED;
                target.state_timer = 1.2f;
                if (dist > 0.01f) {
                    target.x += (dx / dist) * 4.0f;
                    target.z += (dz / dist) * 4.0f;
                }
            }

            g_last_event = EVENT_ULT_TRIGGERED;
            return 1;
        }
    }
    return 0;
}

float* engine_get_state_buffer() {
    // Pack Entity 0 (Player) [0..11]
    g_state_buffer[0] = g_entities[0].x;
    g_state_buffer[1] = g_entities[0].y;
    g_state_buffer[2] = g_entities[0].z;
    g_state_buffer[3] = g_entities[0].vx;
    g_state_buffer[4] = g_entities[0].vy;
    g_state_buffer[5] = g_entities[0].vz;
    g_state_buffer[6] = g_entities[0].rotation;
    g_state_buffer[7] = g_entities[0].health;
    g_state_buffer[8] = g_entities[0].stamina;
    g_state_buffer[9] = (float)g_entities[0].state;
    g_state_buffer[10] = g_entities[0].state_timer;
    g_state_buffer[11] = g_entities[0].ult_charge;

    // Pack Entity 1 (AI) [12..23]
    g_state_buffer[12] = g_entities[1].x;
    g_state_buffer[13] = g_entities[1].y;
    g_state_buffer[14] = g_entities[1].z;
    g_state_buffer[15] = g_entities[1].vx;
    g_state_buffer[16] = g_entities[1].vy;
    g_state_buffer[17] = g_entities[1].vz;
    g_state_buffer[18] = g_entities[1].rotation;
    g_state_buffer[19] = g_entities[1].health;
    g_state_buffer[20] = g_entities[1].stamina;
    g_state_buffer[21] = (float)g_entities[1].state;
    g_state_buffer[22] = g_entities[1].state_timer;
    g_state_buffer[23] = g_entities[1].ult_charge;

    // Pack Meta & Event States [24..31]
    g_state_buffer[24] = (float)g_hit_stop_active;
    g_state_buffer[25] = (float)g_ult_active;
    g_state_buffer[26] = g_ult_active ? (g_ult_timer / g_ult_duration) : 0.0f;
    g_state_buffer[27] = g_ult_origin_x;
    g_state_buffer[28] = g_ult_origin_z;
    g_state_buffer[29] = g_last_parry_ms;
    g_state_buffer[30] = (float)g_last_event;
    g_state_buffer[31] = g_arena_radius;

    return g_state_buffer;
}

int engine_get_buffer_size() {
    return 32;
}

int engine_get_hit_stop_active() {
    return g_hit_stop_active;
}

int engine_get_ult_active() {
    return g_ult_active;
}

float engine_get_ult_progress() {
    return g_ult_active ? (g_ult_timer / g_ult_duration) : 0.0f;
}

float engine_get_ult_origin_x() {
    return g_ult_origin_x;
}

float engine_get_ult_origin_z() {
    return g_ult_origin_z;
}

float engine_get_last_parry_ms() {
    return g_last_parry_ms;
}

}
