import React, { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { Button } from '../../components/ui/button';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  LogOut, 
  Menu,
  X,
  User
} from 'lucide-react';
import senaiLogo from '@/assets/senai-logo-header.png';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Formulários', path: '/admin/formularios', icon: FileText },
    { name: 'Cursos', path: '/admin/cursos', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#00274c] text-white transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shadow-2xl
      `}>
        <div className="h-20 flex items-center justify-between px-6 bg-[#001f3d] border-b border-white/10">
          <img src={senaiLogo} alt="SENAI" className="h-8 brightness-0 invert" />
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-4">Menu Principal</p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-senai-red text-white shadow-lg shadow-red-500/20' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-white/50'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <User className="h-5 w-5 text-white/70" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-xl font-black text-gray-800 tracking-tight hidden sm:block">Painel de Gerenciamento</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Gerencie relatórios e cadastros do SENAI DF</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-gray-700">Administrador</span>
              <span className="text-xs text-green-600 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
}
