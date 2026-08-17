CC = g++
CFLAGS = -O3 -Wall -fPIC -Iinclude
TARGET_LIB = libcombat_engine.so

all: $(TARGET_LIB)

$(TARGET_LIB): src/combat_engine.cpp include/combat_engine.h
	$(CC) $(CFLAGS) -shared src/combat_engine.cpp -o $(TARGET_LIB)

wasm:
	emcc -O3 -Iinclude src/combat_engine.cpp -o ../public/wasm/combat_engine.wasm -s EXPORTED_FUNCTIONS="['_engine_init','_engine_reset','_engine_update','_engine_trigger_ult','_engine_get_state_buffer','_engine_get_buffer_size','_engine_get_hit_stop_active','_engine_get_ult_active','_engine_get_ult_progress','_engine_get_ult_origin_x','_engine_get_ult_origin_z','_engine_get_last_parry_ms']" -s STANDALONE_WASM=1 --no-entry

clean:
	rm -f $(TARGET_LIB) ../public/wasm/combat_engine.wasm
