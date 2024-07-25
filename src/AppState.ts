import {ClassState} from "./StateManager/ClassState.ts";
import {ref} from "vue";

export class AppState extends ClassState {
    private static _instance: AppState | null = null
    cout = ref(0)

    private constructor() {
        super('appState');
    }

    static get instance() {
        if (this._instance == null)
            this._instance = new AppState()
        return this._instance
    }

    incrementBy(int = 1) {
        this.cout.value = this.cout.value + int
    }


}

export class AppState2 extends ClassState {
    private static _instance: AppState2 | null = null
    cout = ref(0)
    count2 = ref(3)

    private constructor() {
        super('Super APp 2');
    }

    static get instance() {
        if (this._instance == null)
            this._instance = new AppState2()
        return this._instance
    }

    incrementBy(int = 1) {
        this.cout.value = this.cout.value + int
    }


}