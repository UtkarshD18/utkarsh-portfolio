#ifndef COMBAT_ENGINE_H
#define COMBAT_ENGINE_H

#ifdef __cplusplus
extern "C" {
#endif

// Entity States
enum EntityActionState {
    STATE_IDLE = 0,
    STATE_MOVE = 1,
    STATE_ATTACK = 2,
    STATE_BLOCK = 3,
    STATE_PARRY = 4,
    STATE_STAGGERED = 5,
    STATE_ULT = 6,
    STATE_KNOCKED_OUT = 7
};

// Event types sent to frontend
enum CombatEventType {
    EVENT_NONE = 0,
    EVENT_HIT = 1,
    EVENT_PERFECT_PARRY = 2,
    EVENT_BLOCK = 3,
    EVENT_ULT_TRIGGERED = 4,
    EVENT_RING_KNOCKOUT = 5
};

struct Entity {
    float x;
    float y;
    float z;
    float vx;
    float vy;
    float vz;
    float rotation;
    float health;
    float stamina;
    int state;
    float state_timer;
    float ult_charge;
};

// Exported WebAssembly API
void engine_init(float arena_radius, float parry_window_ms, float hit_stop_ms);
void engine_reset();
int engine_update(float dt, int player_action, float player_move_x, float player_move_z, int ai_action, float ai_move_x, float ai_move_z);
int engine_trigger_ult(int entity_id);

// Memory buffer access
float* engine_get_state_buffer();
int engine_get_buffer_size();
int engine_get_hit_stop_active();
int engine_get_ult_active();
float engine_get_ult_progress();
float engine_get_ult_origin_x();
float engine_get_ult_origin_z();
float engine_get_last_parry_ms();

#ifdef __cplusplus
}
#endif

#endif // COMBAT_ENGINE_H
