import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { store } from "./store"
import { Provider } from "react-redux"
import { GetEnvVariables } from "./helpers"

export const CalendarApp = () => {


    return (
        <>
            <Provider store={store}>

                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Provider>
        </>
    )
}
