

// Extensions of Vue types to be appended manually
// https://github.com/microsoft/rushstack/issues/2090
// https://github.com/microsoft/rushstack/issues/1709

// @ts-ignore: works on Vue 2, fails in Vue 3
import {ClassState} from "./StateManager/ClassState.ts";
type ClassStateInstance = ClassState
declare module '@vue/runtime-core' {
  interface Vue {
    /**
     * Currently installed pinia instance.
     */
    _sAppState: ClassStateInstance

    /**
     * Cache of stores instantiated by the current instance. Used by map
     * helpers. Used internally by Pinia.
     *
     * @internal
     */
    _sStatesManager: Record<string, ClassStateInstance>
  }
}

// @ts-ignore: works on Vue 2, fails in Vue 3
// declare module 'vue/types/options' {
//   interface ComponentOptions<V> {
//     /**
//      * Pinia instance to install in your application. Should be passed to the
//      * root Vue.
//      */
//     pinia?: Pinia
//   }
// }

/**
 * NOTE: Used to be `@vue/runtime-core` but it break types from time to time. Then, in Vue docs, we started recommending
 * to use `vue` instead of `@vue/runtime-core` but that broke others' types so we reverted it. Now, local types do not
 * work if we use `@vue/runtime-core` so we are using `vue` again.
 */
// @ts-ignore: works on Vue 3, fails in Vue 2
declare module 'vue' {
  export interface ComponentCustomProperties {
    /**
     * Access to the application's Pinia
     */
    _sAppState: ClassStateInstance

    /**
     * Cache of stores instantiated by the current instance. Used by devtools to
     * list currently used stores. Used internally by Pinia.
     *
     * @internal
     */
    _sStatesManager: Record<string, ClassStateInstance>
  }
}

// normally this is only needed in .d.ts files
export {}
