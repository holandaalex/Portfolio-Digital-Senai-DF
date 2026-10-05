import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download, Search, Filter, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Formulario {
  id: number;
  tipo: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  status: string;
  created_at: string;
  dados_adicionais: any;
}

export default function AdminFormularios() {
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTipo, setFilterTipo] = useState('');

  const fetchFormularios = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/admin/formularios', {
        params: { tipo: filterTipo }
      });
      setFormularios(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar formulários:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFormularios();
  }, [filterTipo]);

  const handleExportCSV = () => {
    if (formularios.length === 0) return;
    
    const headers = ['ID', 'Tipo', 'Nome', 'Email', 'Telefone', 'Status', 'Data'];
    const csvContent = [
      headers.join(','),
      ...formularios.map(f => 
        [f.id, f.tipo, `"${f.nome}"`, f.email, f.telefone, f.status, new Date(f.created_at).toLocaleDateString()].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_formularios_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    if (formularios.length === 0) return;
    
    const doc = new jsPDF();
    doc.text('Relatório de Formulários - SENAI DF', 14, 15);
    
    const headers = [['Tipo', 'Nome', 'Contato', 'Status', 'Data']];
    const data = formularios.map(f => [
      getTipoLabel(f.tipo),
      f.nome,
      `${f.email || ''}\n${f.telefone || ''}`,
      f.status.toUpperCase(),
      new Date(f.created_at).toLocaleDateString('pt-BR')
    ]);

    (doc as any).autoTable({
      startY: 25,
      head: headers,
      body: data,
      theme: 'grid',
      headStyles: { fillColor: [204, 0, 0] }, // Vermelho SENAI
      styles: { fontSize: 9 },
    });

    doc.save(`relatorio_formularios_${new Date().getTime()}.pdf`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'novo': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'lido': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'respondido': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch(tipo) {
      case 'contato': return 'Contato';
      case 'interesse_curso': return 'Interesse em Curso';
      case 'jovem_aprendiz': return 'Jovem Aprendiz';
      default: return tipo;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Formulários Recebidos</h2>
          <p className="text-sm text-slate-500 mt-1">Gerencie e exporte os contatos feitos pelo site.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto bg-white" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button className="w-full sm:w-auto bg-senai-red hover:bg-red-700 text-white shadow-md shadow-red-500/20" onClick={handleExportPDF}>
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Filters and Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar por nome..." className="pl-9 bg-white" />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select 
              className="text-sm border-slate-200 rounded-md focus:ring-senai-red focus:border-senai-red block w-full bg-white px-3 py-2 border outline-none"
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            >
              <option value="">Todos os Tipos</option>
              <option value="contato">Contato</option>
              <option value="jovem_aprendiz">Jovem Aprendiz</option>
              <option value="interesse_curso">Interesse em Curso</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">Tipo</th>
                <th className="px-6 py-4 font-bold">Nome</th>
                <th className="px-6 py-4 font-bold">Contato</th>
                <th className="px-6 py-4 font-bold">Data</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-senai-red"></div>
                    <p className="mt-2">Carregando formulários...</p>
                  </td>
                </tr>
              ) : formularios.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    Nenhum formulário encontrado.
                  </td>
                </tr>
              ) : (
                formularios.map((form) => (
                  <tr key={form.id} className="bg-white border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {getTipoLabel(form.tipo)}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {form.nome}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div>{form.email || '-'}</div>
                      <div className="text-xs">{form.telefone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(form.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getStatusColor(form.status)} uppercase tracking-wider`}>
                        {form.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-senai-red hover:bg-red-50 rounded transition-colors" title="Ver detalhes">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {!isLoading && formularios.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
            <span>Mostrando {formularios.length} resultados</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm">Próxima</Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
