import { createStore } from 'vuex'

export default createStore({
  state: {
    habits: Array(),
  },
  getters: {
    habits: state => state.habits,
  },
  mutations: {
    addHabit: (state, habit) => {
      state.habits.push(habit)
    },
    updateHabit: (state, habit) => {
      state.habits.map((item: any) => {
        if (item.id === habit.id) {
          return {
            ...habit,
          };
        }
        return {
          ...item,
        };
      })
    },
    removeHabit: (state, habit) => {
      const itemIndex = state.habits.findIndex((item: any) => item.id === habit.id);
      state.habits = [...state.habits.slice(0, itemIndex), ...state.habits.slice(itemIndex + 1)];
    }
  },
  actions: {
  },
  modules: {
  }
})
