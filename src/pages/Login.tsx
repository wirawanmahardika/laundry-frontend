import { useNavigate } from "react-router-dom"
import { AxiosAuth } from "../utils/axios"
import Swal from 'sweetalert2'
import { useAlreadyAuth } from "../hooks/useAuth"

export default function Login() {
    useAlreadyAuth()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = { email: e.currentTarget.email.value, password: e.currentTarget.password.value }

        try {
            const res = await AxiosAuth.post("/login", body)
            localStorage.setItem("token", res.data.token)
            await Swal.fire({
                title: "Success",
                text: res.data.message,
                icon: "success"
            });
            navigate("/")
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                title: "Login Gagal",
                text: Array.isArray(error.response?.data?.errors)
                    ? error.response.data.errors.join(", ")
                    : (error.response?.data?.message ?? "terjadi kesalahan saat login"),
                icon: "error"
            });
        }
    }

    return <section className="h-screen bg-[url(/gelembung.png)]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-bold text-sky-700">
                Laundry
            </a>
            <div className="w-full bg-white rounded-lg shadow border border-sky-100 md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-sky-700 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form onSubmit={loginHandler} className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-sky-700">Email</label>
                            <input type="email" name="email" id="email" className="bg-sky-50 border border-sky-200 text-sky-900 rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-2.5" required autoComplete="off" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-sky-700">Password</label>
                            <input type="password" name="password" id="password" className="bg-sky-50 border border-sky-200 text-sky-900 rounded-lg focus:ring-sky-400 focus:border-sky-400 block w-full p-2.5" required autoComplete="off" />
                        </div>

                        <button type="submit" className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
}