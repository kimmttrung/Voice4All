import { useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <main className="container mx-auto py-16">
            <div className="mx-auto w-full max-w-md rounded-2xl border p-6 shadow-sm">
                <h1 className="text-2xl font-bold">Đăng nhập</h1>
                <form className="mt-6 grid gap-4" aria-label="Login form">
                    <div>
                        <label className="block text-sm font-medium" htmlFor="email">Email</label>
                        <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" />
                    </div>

                    {/* Mật khẩu + Nút ẩn/hiện */}
                    <div className="relative">
                        <label className="block text-sm font-medium" htmlFor="password">Mật khẩu</label>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    <Button type="submit" className="w-full">Đăng nhập</Button>

                    <div className="grid gap-2">
                        <Button variant="outline" className="w-full">Đăng nhập với Google</Button>
                        <Button variant="outline" className="w-full">Đăng nhập với Facebook</Button>
                    </div>

                    <div className="flex justify-between text-sm">
                        <Link className="text-primary hover:underline" to="#">Quên mật khẩu?</Link>
                        <Link className="text-primary hover:underline" to="/signup">Tạo tài khoản</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}
