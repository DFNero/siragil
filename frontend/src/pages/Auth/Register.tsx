import { useState } from "react";
import { Link } from "react-router-dom";
import Stepper, { Step } from "../../components/Stepper";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStepRef, setCurrentStepRef] = useState(1);

  const validateCurrentStep = (nextStep: number): boolean => {
    if (nextStep < currentStepRef) {
      return true;
    }

    const newErrors: Record<string, string> = {};

    if (currentStepRef === 1 && nextStep === 2) {
      if (!name.trim()) {
        newErrors.name = "Nama harus diisi";
      } else if (name.trim().length < 3) {
        newErrors.name = "Nama minimal 3 karakter";
      }
    }

    if (currentStepRef === 2 && nextStep === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        newErrors.email = "Email harus diisi";
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Format email tidak valid";
      }
    }

    if (currentStepRef === 3 && nextStep === 4) {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (currentStepRef === 4) {
        return;
      }
      
      const isValid = validateCurrentStep(currentStepRef + 1);
      
      if (isValid && currentStepRef < 4) {
        setCurrentStepRef(currentStepRef + 1);
      }
    }
  };

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
        setIsSubmitting(false);
      } else {
        setMessage(data.message || "Gagal mendaftar");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan saat menghubungi server.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-6 w-full max-w-4xl">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mb-3 shadow-xl">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Registrasi Akun Kasir</h1>
        <p className="text-blue-200">Lengkapi data untuk membuat akun</p>
      </div>

      {/* Form Card - Reduced height and optimized layout */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <Stepper
          initialStep={1}
          currentStep={currentStepRef}
          isSuccess={isSuccess}
          onFinalStepCompleted={() => {}}
          onStepChange={(step) => {
            const isValid = validateCurrentStep(step);
            if (isValid) {
              setCurrentStepRef(step);
              return true;
            }
            return false;
          }}
          backButtonText="Kembali"
          nextButtonText="Lanjut"
          disableStepIndicators={false}
          customFooter={
            currentStepRef === 4 ? 
            (handleBack, handleNext) => (
              !isSuccess && !isSubmitting && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 px-6 pb-8 pt-4">
                  <button
                    onClick={handleBack}
                    className="order-2 sm:order-1 w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gray-100 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-sm hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Buat Akun Sekarang
                      </>
                    )}
                  </button>
                </div>
              )
            ) : undefined
          }
        >
          <Step>
            <div className="px-6 py-4">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Nama Lengkap</h2>
                <p className="text-sm text-gray-600">Masukkan nama lengkap Anda</p>
              </div>
              <div className="max-w-md mx-auto space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-3 border-2 ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    placeholder="Contoh: John Doe"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-blue-800">Nama akan ditampilkan pada profil dan struk transaksi</span>
                  </div>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="px-6 py-4">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Email</h2>
                <p className="text-sm text-gray-600">Gunakan email aktif untuk login</p>
              </div>
              <div className="max-w-md mx-auto space-y-3">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-3 border-2 ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-amber-800">Pastikan email benar, akan digunakan untuk login</span>
                  </div>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="px-6 py-4">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Keamanan</h2>
                <p className="text-sm text-gray-600">Buat password yang kuat</p>
              </div>
              <div className="max-w-md mx-auto space-y-3">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    id="password"
                    type="password"
                    className={`w-full px-4 py-3 border-2 ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`w-full px-4 py-3 border-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    placeholder="Ketik ulang password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 shrink-0 mt-0.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-800">Password minimal 6 karakter untuk keamanan akun</span>
                  </div>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="px-6 py-4">
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <svg className="animate-spin h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-xl font-bold text-gray-800 mt-4">Membuat akun...</p>
                  <p className="text-gray-600 mt-2">Mohon tunggu sebentar</p>
                </div>
              ) : isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-600 mb-3">Registrasi Berhasil!</h2>
                  <p className="text-gray-600 mb-6 text-center">{message}</p>
                  <Link to="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                    Ke Halaman Login
                  </Link>
                </div>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Konfirmasi Data</h2>
                    <p className="text-sm text-gray-600">Periksa kembali data Anda</p>
                  </div>
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
                        <span className="text-gray-700 font-semibold">Nama:</span>
                        <span className="font-bold text-gray-900">{name}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
                        <span className="text-gray-700 font-semibold">Email:</span>
                        <span className="font-bold text-gray-900 break-all text-right">{email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Role:</span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full font-bold bg-blue-600 text-white text-sm">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          Kasir
                        </span>
                      </div>
                    </div>
                    {message && (
                      <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-sm">{message}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Step>
        </Stepper>
      </div>

      {/* Footer */}
      {!isSuccess && !isSubmitting && (
        <div className="text-center mt-6 w-full max-w-4xl">
          <p className="text-white mb-2">Sudah punya akun?</p>
          <Link to="/login" className="inline-flex items-center text-blue-300 hover:text-blue-100 font-bold transition">
            Login di sini
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}