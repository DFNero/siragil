import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper, { Step } from "../components/Stepper";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Validasi per step - Return false untuk block, true untuk allow
  const validateCurrentStep = (nextStep: number): boolean => {
    // Jika pindah ke step sebelumnya (back), selalu allow
    if (nextStep <= currentStepRef) {
      return true;
    }

    const currentStep = nextStep - 1; // Step yang sedang divalidasi
    const newErrors: Record<string, string> = {};

    // Step 1 - Nama
    if (currentStep === 1) {
      if (!name.trim()) {
        newErrors.name = "Nama harus diisi";
      } else if (name.trim().length < 3) {
        newErrors.name = "Nama minimal 3 karakter";
      }
    }

    // Step 2 - Email
    if (currentStep === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        newErrors.email = "Email harus diisi";
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Format email tidak valid";
      }
    }

    // Step 3 - Password
    if (currentStep === 3) {
      if (!password) {
        newErrors.password = "Password harus diisi";
      } else if (password.length < 6) {
        newErrors.password = "Password minimal 6 karakter";
      }
      
      if (!confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password harus diisi";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Password tidak cocok";
      }
    }

    // Step 4 - No validation, always allow (ini halaman review)
    if (currentStep === 4 || nextStep === 5) {
      return true;
    }

    setErrors(newErrors);
    
    // Return false jika ada error (block step change)
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    
    return true; // Allow step change
  };

  // Track current step untuk validasi
  const [currentStepRef, setCurrentStepRef] = useState(1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role: "kasir",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Akun kasir berhasil dibuat! Silakan login.");
      } else {
        setMessage(data.message || "Gagal mendaftar");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-start justify-center p-4 py-8 overflow-y-auto">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-600 rounded-full mb-3">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Registrasi Akun Kasir</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Lengkapi data untuk membuat akun</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Stepper
            initialStep={1}
            onFinalStepCompleted={() => {}} // Tidak auto-submit lagi
            onStepChange={(step) => {
              setCurrentStepRef(step);
              return validateCurrentStep(step);
            }}
            backButtonText="Kembali"
            nextButtonText="Lanjut"
            disableStepIndicators={false}
          >
            {/* STEP 1 - Nama */}
            <Step>
              <div className="space-y-3 py-4">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mb-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Nama Lengkap</h2>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">Masukkan nama lengkap Anda</p>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-3 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                    placeholder="Contoh: John Doe"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors({ ...errors, name: "" });
                      }
                    }}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Nama akan ditampilkan pada profil dan struk transaksi</span>
                </div>
              </div>
            </Step>

            {/* STEP 2 - Email */}
            <Step>
              <div className="space-y-3 py-4">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Email</h2>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">Gunakan email aktif untuk login</p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({ ...errors, email: "" });
                      }
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700 flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Pastikan email benar, akan digunakan untuk login</span>
                </div>
              </div>
            </Step>

            {/* STEP 3 - Password */}
            <Step>
              <div className="space-y-3 py-4">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Keamanan</h2>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">Buat password yang kuat</p>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`w-full px-4 py-3 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors({ ...errors, password: "" });
                      }
                    }}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`w-full px-4 py-3 border ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    placeholder="Ketik ulang password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors({ ...errors, confirmPassword: "" });
                      }
                    }}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Password minimal 6 karakter untuk keamanan akun</span>
                </div>
              </div>
            </Step>

            {/* STEP 4 - Konfirmasi */}
            <Step>
              <div className="text-center space-y-4 py-4">
                {isSubmitting ? (
                  <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-purple-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-base md:text-lg text-gray-700 font-medium">Sedang membuat akun...</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">Mohon tunggu sebentar</p>
                  </div>
                ) : isSuccess ? (
                  <>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-green-600">Registrasi Berhasil! 🎉</h2>
                    <p className="text-sm md:text-base text-gray-600">{message}</p>
                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Mengalihkan ke halaman login...</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mb-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Konfirmasi Data</h2>
                    <p className="text-gray-500 text-xs md:text-sm">Periksa kembali data Anda sebelum melanjutkan</p>
                    
                    <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600 font-medium">Nama:</span>
                        <span className="font-semibold text-gray-800">{name}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600 font-medium">Email:</span>
                        <span className="font-semibold text-gray-800 break-all">{email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Role:</span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          Kasir
                        </span>
                      </div>
                    </div>

                    {message && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {message}
                      </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700 flex items-start gap-2">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Klik "Complete" untuk membuat akun kasir Anda</span>
                    </div>
                  </>
                )}
              </div>
            </Step>
          </Stepper>

          {/* Login Link */}
          {!isSuccess && !isSubmitting && (
            <div className="mt-6 text-center border-t border-gray-200 pt-6">
              <p className="text-gray-600 text-sm mb-2">Sudah punya akun?</p>
              <Link to="/login" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition">
                Login di sini
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}