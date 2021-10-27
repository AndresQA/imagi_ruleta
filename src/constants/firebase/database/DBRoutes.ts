const app = "app"

const DBRoutes = {

    USER: {
        _THIS: app + "/users",
        INFORMATION: "information",
        REGISTRO: "register",
        PERMISOS: "permisos"

    },
    BACKUP: {
        _THIS: app + "/backup",
        INTERACCIONES: "interacciones",
        USER: "user",
        METADATA: "metadata",
        RESULTADOS: "resultados"
    },
    TEST: {
        _THIS: app + "/test",
        INFORMATION: "information",

        DATA: "data",
        ORDEN: "orden",
        URL: "URL",
        PREGUNTAS: "preguntas"
    },
    RESULTADOS: {
        _THIS: app + "/resultados",
        INFORMATION: "information",
        DATA: "data",
        PUNTAJE: "puntaje",
        COPIA: "copia"
    },
    COMENTARIOS: {
        _THIS: app + "/comentarios",
        ACTIVIDADES: "actividades"
    }

}

export default DBRoutes;