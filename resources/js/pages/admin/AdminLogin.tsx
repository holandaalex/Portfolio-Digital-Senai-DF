import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../lib/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import senaiLogo from '@/assets/senai-logo-header.png';
import bgImage from '@/assets/areas/desenvolvimento-sistemas.jpg';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/login', { email, password });
      login(response.data.access_token, response.data.user);
      navigate('/admin');
    } catch (err) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white">
      
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative">
        
        {/* Voltar */}
        <Link to="/" className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-senai-red transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>

        <div className="max-w-[420px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <img src={senaiLogo} alt="SENAI" className="h-10 mb-12" />
          
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bem-vindo de volta</h1>
            <p className="text-slate-500">Acesse o painel para gerenciar os dados da instituição.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 animate-in fade-in zoom-in-95 duration-300">
              <div className="mt-0.5">
                <Lock className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-bold">E-mail corporativo</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <Input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alexholanda.com.br"
                  className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-bold">Senha de acesso</Label>
                <a href="#" className="text-xs font-semibold text-senai-red hover:underline">Esqueceu a senha?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <Input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="btn-senai-accent w-full flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Autenticando...
                </>
              ) : (
                'Acessar Painel'
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Acesso restrito a colaboradores autorizados do Sistema FIBRA.
          </p>
        </div>
      </div>

      {/* Lado Direito - Imagem e Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-950 overflow-hidden">
        {/* Imagem de Fundo */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[10s] hover:scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        
        {/* Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-senai-dark/60 to-transparent"></div>

        <div className="relative z-10 p-16 flex flex-col justify-end w-full h-full">
          <div className="max-w-md animate-in fade-in slide-in-from-right-8 duration-1000 delay-150">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              Sistema Integrado
            </span>
            <h2 className="text-4xl font-black text-white mb-6 leading-tight drop-shadow-md">
              Gestão inteligente para a educação do futuro.
            </h2>
            <p className="text-lg text-white/90 drop-shadow-sm font-medium">
              Acompanhe inscrições, gere relatórios precisos e gerencie todos os cursos do SENAI DF em um só lugar.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
