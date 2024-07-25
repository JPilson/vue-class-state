import {App, getCurrentInstance} from "vue";

// const stateStore: UnwrapRef<Map<String, ClassState>> = reactive(new Map())

export abstract class ClassState {
    static app: App

    protected constructor(protected context: string) {
        this.createState()
    }

    public static init() {
        const currentInstance = getCurrentInstance();

        if (currentInstance && currentInstance.proxy) {
            const vm = currentInstance.proxy

            if (('_sStatesManager' in vm)) {
                vm['_sStatesManager'] = {}

            }


            return
        }

    }

    private createState() {

        const vm = ClassState.app.config.globalProperties._sStatesManager
        if (vm[this.context])
            throw new Error(`State Store ${this.context} already exists.`)
        vm[this.context] = this


    }

    private static getStates() {
        // return getCurrentInstance()?.proxy?._sStatesManager ?? null
        return ClassState.app.config.globalProperties._sStatesManager
    }



    static statOf<T extends ClassState>(context: string) {
        const state = this.getStates()

        if (!state || !state[context]) {
            throw new Error('Failed to load Store state repository')
        }
        return state[context] as T
    }
    static keysOfState(){
        const states = this.getStates()
        console.log(states)
        if(!states)
            return []
        return Object.keys(states).map((key: string) => key)
    }
}

