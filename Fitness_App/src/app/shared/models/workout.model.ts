import { Exercise } from "./exercise.model";

export class Workout{
    public name: string;
    public exercise: Exercise[]
    constructor(
        name: string,
        exercise: Exercise[]
        ) {
            this.name = name;
            this.exercise = exercise;
        }
}