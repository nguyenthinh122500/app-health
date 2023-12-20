import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { MealReducer } from "./reducer/MealReducer";
import { ExercisesReducer } from "./reducer/ExercisesReducer";
import { UserReducer } from "./reducer/USerReducer";
import { WorkoutReducer } from "./reducer/WorkoutReducer";


const rootReducer = combineReducers({
    MealReducer,
    ExercisesReducer,
    UserReducer,
    WorkoutReducer,
});

let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(middleWare);

export const store = createStore(rootReducer, composeCustom);
