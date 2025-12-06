import Link from "next/link";
import { RiSteering2Line, RiShieldCheckLine, RiTimeLine } from "react-icons/ri";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary-400 text-sm font-medium mb-4">
          <RiShieldCheckLine />
          <span>سامانه هوشمند آموزش رانندگی</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-dark-400 leading-tight">
          مسیر حرفه‌ای شدن <br />
          <span className="text-primary-500">از اینجا</span> شروع می‌شود
        </h1>
        
        <p className="text-xl text-dark-300 max-w-2xl mx-auto leading-relaxed">
          با سیستم جامع آموزشگاه رانندگی، کلاس‌های خود را مدیریت کنید، پیشرفتتان را ببینید و با اطمینان در مسیر گواهینامه قدم بردارید.
        </p>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto mt-12">
          <Link href="/user" className="group relative overflow-hidden rounded-2xl glass-card p-8 text-right hover:border-primary-500/50 transition-all duration-300 hover:shadow-glowPrimary hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all" />
            <RiSteering2Line className="text-4xl text-primary-500 mb-4 group-hover:scale-110 transition-transform origin-right" />
            <h3 className="text-2xl font-bold text-white mb-2">ورود هنرجویان</h3>
            <p className="text-dark-400">مشاهده کلاس‌ها، آزمون‌ها و مدیریت پروفایل شخصی</p>
          </Link>

          <Link href="/admin" className="group relative overflow-hidden rounded-2xl glass-card p-8 text-right hover:border-secondary-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl group-hover:bg-secondary-500/20 transition-all" />
            <RiShieldCheckLine className="text-4xl text-secondary-500 mb-4 group-hover:scale-110 transition-transform origin-right" />
            <h3 className="text-2xl font-bold text-white mb-2">پنل مدیریت</h3>
            <p className="text-dark-400">مدیریت کاربران، مربیان و زمان‌بندی کلاس‌ها</p>
          </Link>
        </div>
      </div>
      
      {/* Footer Stats/Info */}
      <div className="absolute bottom-10 flex gap-8 text-dark-500 text-sm font-medium">
        <div className="flex items-center gap-2">
          <RiTimeLine className="text-primary-500" />
          <span>پشتیبانی ۲۴/۷</span>
        </div>
        <div className="w-[1px] h-4 bg-dark-800"></div>
        <div>نسخه ۲.۰.۰</div>
      </div>
    </div>
  );
}
