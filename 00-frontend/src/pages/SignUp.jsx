import { useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <main className="container mx-auto py-16">
            <div className="mx-auto w-full max-w-md rounded-2xl border p-6 shadow-sm">
                <h1 className="text-2xl font-bold">Đăng ký</h1>
                <form className="mt-6 grid gap-4" aria-label="Sign up form">
                    <div>
                        <label className="block text-sm font-medium" htmlFor="name">Tên</label>
                        <Input id="name" type="text" autoComplete="name" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium" htmlFor="email">Email</label>
                        <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" />
                    </div>

                    {/* Mật khẩu */}
                    <div className="relative">
                        <label className="block text-sm font-medium" htmlFor="password">Mật khẩu</label>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
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

                    {/* Xác nhận mật khẩu */}
                    <div className="relative">
                        <label className="block text-sm font-medium" htmlFor="confirm">Xác nhận mật khẩu</label>
                        <Input
                            id="confirm"
                            type={showConfirm ? "text" : "password"}
                            autoComplete="new-password"
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                        >
                            {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    <Button type="submit" className="w-full">Tạo tài khoản</Button>
                </form>
            </div>
        </main>
    )
}
