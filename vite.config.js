//Specify Thingz

import {defineConfig} from "vite";

export default defineConfig({
   // base: "/MysterBotzPortfolio.io", //Need para mahanap yung mga assets
    base: "./", //Base path for assets, adjust as needed
    build: {
        minify: "terser", //Gagamit ng terser para sa minification
        //Also for kaboom to not get bugged
    }

});
