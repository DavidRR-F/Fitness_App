import { Action, createReducer, on, State } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Meal } from '../../shared/models/meal.model';
import { 
    addIngredient, 
    addMeal, 
    removeIngredient, 
    removeMeal, 
    setMeals, 
    startMealUpdate, 
    stopMealUpdate, 
    updateMeal 
} from './meal.actions';

export interface MealState {
    meals: Meal[];
    editedMeal: Meal;
    editedMealIndex: number 
}

const initialState: MealState = {
    meals: [],
    editedMeal: null,
    editedMealIndex: -1
    }


export const mealReducer = createReducer(
    initialState,
    on(addMeal, (entries, payload) => {
        const entriesClone: MealState = JSON.parse(JSON.stringify(entries));
        entriesClone.meals.push(payload);
        return entriesClone;
    }),
    on(removeMeal, (entries, payload) => {
        const entriesClone: MealState = JSON.parse(JSON.stringify(entries));
        entriesClone.meals.splice(payload.index, 1);
        console.log('removeMeal');
        return entriesClone;
    }),
    on(updateMeal, (entries, payload) => {
        const entriesClone: MealState = JSON.parse(JSON.stringify(entries));
        entriesClone.meals.splice(entriesClone.editedMealIndex, 1, payload)
        return calcMacros(entriesClone);
    }),
    on(startMealUpdate, (entries, payload) => {
        const entriesClone: MealState = JSON.parse(JSON.stringify(entries));
        entriesClone.editedMealIndex = payload.index;
        entriesClone.editedMeal = entriesClone.meals[payload.index];
        console.log('startMealUpdate');
        return entriesClone;
    }),
    on(stopMealUpdate, (entries) => {
        const entriesClone: MealState = JSON.parse(JSON.stringify(entries));
        entriesClone.editedMealIndex = -1;
        entriesClone.editedMeal = null;
        console.log('stopMealUpdate');
        return entriesClone;
    }),
    on(addIngredient, (entries, payload) => {
        const entriesClone: MealState = JSON.parse(JSON.stringify(entries));
        console.log(entriesClone);
        entriesClone.meals[entriesClone.editedMealIndex].ingredients.unshift(payload);
        return calcMacros(entriesClone);
    }),
    on(removeIngredient, (entries, payload) => {
        const entriesClone: MealState = JSON.parse(JSON.stringify(entries));
        console.log(entriesClone.editedMealIndex);
        entriesClone.meals[entriesClone.editedMealIndex].ingredients.splice(payload.index, 1);
        return calcMacros(entriesClone);
    }),
    on(setMeals, (entries, payload) => {
        return {...entries, meals: [...payload.meals] }
    })
);

export function reducer(state: MealState | undefined, action: Action){
    return mealReducer(state, action);
}

export function calcMacros(entriesClone: any) {
    // update cals
    entriesClone.meals[entriesClone.editedMealIndex] = { 
        ...entriesClone.meals[entriesClone.editedMealIndex],
    Calories: entriesClone.meals[entriesClone.editedMealIndex].ingredients
    .map(x => x.calories).reduce(function(a, b){ return a+b; }),
    // update carbs
    Carbs: entriesClone.meals[entriesClone.editedMealIndex].ingredients
    .map(x => x.carbs).reduce(function(a, b){ return a+b; }),
    // update fats
    Fats: entriesClone.meals[entriesClone.editedMealIndex].ingredients
    .map(x => x.fats).reduce(function(a, b){ return a+b; }),
    // update protein
    Protein: entriesClone.meals[entriesClone.editedMealIndex].ingredients
    .map(x => x.protein).reduce(function(a, b){ return a+b; })
    }
    return entriesClone;
}

