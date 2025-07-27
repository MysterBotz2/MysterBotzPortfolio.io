//Specify Thingz

import {defineConfig} from "vite";

export default defineConfig({
    base: "./", //Need para mahanap yung mga assets
    build: {
        minify: "terser", //Gagamit ng terser para sa minification
        //Also for kaboom to not get bugged
    }

});
