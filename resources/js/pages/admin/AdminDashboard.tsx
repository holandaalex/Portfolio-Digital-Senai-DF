import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, BookOpen, Users, Mail, GraduationCap } from 'lucide-react';

interface Metrics {
  total_formularios: number;
  jovem_aprendiz: number;
  interesse_curso: number;
  contatos: number;
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    total_formularios: 0,
    jovem_aprendiz: 0,
    interesse_curso: 0,
    contatos: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('/admin/metrics');
        setMetrics(response.data);
      } catch (error) {
        console.error('Erro ao buscar métricas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const statCards = [
    {
      title: 'Total de Formulários',
      value: metrics.total_formularios,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      desc: 'Todas as submissões'
    },
    {
      title: 'Interesse em Cursos',
      value: metrics.interesse_curso,
      icon: BookOpen,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      desc: 'Pré-matrículas e dúvidas'
    },
    {
      title: 'Jovem Aprendiz',
      value: metrics.jovem_aprendiz,
      icon: GraduationCap,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      desc: 'Candidatos inscritos'
    },
    {
      title: 'Fale Conosco',
      value: metrics.contatos,
      icon: Mail,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      desc: 'Mensagens gerais'
    }
  ];

  if (isLoading) {
    return <div className="animate-pulse flex gap-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-32 w-full bg-slate-200 rounded-xl"></div>
      ))}
    </div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-slate-800">Visão Geral</h2>
        <p className="text-slate-500 mt-1">Acompanhe os principais indicadores do portal SENAI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`bg-white rounded-xl p-6 border ${stat.border} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}>
            {/* Decoração de Fundo */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.bg} rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500`}></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-slate-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="relative z-10 mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
        <h3 className="text-xl font-bold text-slate-700 mb-2">Bem-vindo ao Painel SENAI</h3>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Utilize o menu lateral para navegar entre a gestão de formulários e o cadastro de cursos. 
          Todas as solicitações de Contato, Jovem Aprendiz e Interesse de Cursos caem diretamente na aba de Formulários.
        </p>
      </div>
    </div>
  );
}
