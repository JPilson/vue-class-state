import {CustomInspectorNode, DevtoolsPluginApi, setupDevtoolsPlugin} from "@vue/devtools-api";
import {App, ComponentPublicInstance, isRef, MaybeRef} from "vue";
import {ClassState} from "../StateManager/ClassState.ts";
import type {StateBase} from "@vue/devtools-api/lib/esm/api/component";

export default class Setup {
    protected id = 'my-awesome-devtools-plugin'
    protected label = 'My Awesome Plugin'
    protected packageName = 'my-awesome-plugin'
    protected homepage = 'https://vuejs.org'
    private static api: DevtoolsPluginApi<DevStateType>

    private constructor(private app: Record<string, any>) {

    }

    init() {
        setupDevtoolsPlugin({
            id: this.id,
            label: this.label,
            packageName: this.packageName,
            homepage: this.homepage,
            app: this.app,
            settings: {
                test1: {
                    label: 'I like vue devtools',
                    type: 'boolean',
                    defaultValue: true
                }
            }
        }, api => {
            Setup.api = api as unknown as DevtoolsPluginApi<DevStateType>
            Setup.registerOnInspectComponent()
            Setup.addInspector()
            Setup.startInspectorTree('Class State')

        })

    }

    protected static registerOnInspectComponent() {
        this.api.on.inspectComponent((payload, _) => {
            const proxy = (payload.componentInstance &&
                payload.componentInstance.proxy) as
                | ComponentPublicInstance
                | undefined
            console.log()
            if (!proxy)
                return

            console.log(proxy._sStatesManager)

        })
    }

    private static addInspector() {
        Setup.api.addInspector({
            id: 'Class State',
            label: 'Class State',
            icon: 'pets'
        })
    }

    protected static startInspectorTree(inspectorId: string) {

        for (const context of ClassState.keysOfState()) {
            console.log("Context ", context)
            const classState = ClassState.statOf(context)
            const nodes: Array<CustomInspectorNode> = [Setup.getClassStatesOf(classState)]

            Setup.api.on.getInspectorTree((payload, _) => {
                if (payload.inspectorId === inspectorId) {
                    payload.rootNodes = nodes
                }
            })
        }

    }

    private static getClassStatesOf(state: ClassState): CustomInspectorNode {
        const nodeId = 'context_stat)' + state['context']
        const node: CustomInspectorNode = {
            id: nodeId,
            label: state['context'],
            children: []
        }
        Object.keys(state).forEach((key: string) => {
            if (key === 'context')
                return

            if (isRef(state[key as keyof ClassState])) {

                Setup.api.on.getInspectorState((payload, _) => {
                    if (payload.nodeId !== nodeId)
                        return
                    console.log("The Same",payload.nodeId , nodeId)
                    if (!(payload.state))
                        payload.state = {state: []}

                    payload.state['state'].push(Setup.createStateInspector(key, state[key as keyof ClassState]))
                })
            }

        })
        return node
    }

    static createStateInspector(key: string, value: MaybeRef<unknown>): StateBase {
        const state: StateBase = {
            key, value: isRef(value) ? value.value : value
        }
        return state
    }

    static install(app: App<Element>, _: Record<string, any> = {}) {

        app.config.globalProperties._sStatesManager = {}
        ClassState.app = app
        const plugin = new Setup(app)
        // @ts-ignore
        plugin.init(app)


        //@ts-ignore
        // Our Vue plugin logic


    }
}

type DevStateType = {
    test1: {
        label: string
        type: string
        defaultValue: boolean
    }
}