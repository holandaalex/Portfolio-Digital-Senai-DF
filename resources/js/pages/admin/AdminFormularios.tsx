import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download, Search, Filter, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Formulario {
  id: number;
  tipo: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  mensagem: string | null;
  status: string;
  created_at: string;
  dados_adicionais: any;
}

export default function AdminFormularios() {
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTipo, setFilterTipo] = useState('');
  const [selectedForm, setSelectedForm] = useState<Formulario | null>(null);

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
    
    // Layout Premium para CSV = Forçar UTF-8 com BOM para abrir perfeitamente no Excel
    const BOM = '\uFEFF';
    const headers = ['ID', 'Tipo', 'Nome Completo', 'Email', 'Telefone', 'Status', 'Data de Recebimento'];
    const csvContent = [
      headers.join(','),
      ...formularios.map(f => 
        [f.id, getTipoLabel(f.tipo), `"${f.nome}"`, `"${f.email || ''}"`, `"${f.telefone || ''}"`, f.status, new Date(f.created_at).toLocaleDateString('pt-BR')].join(',')
      )
    ].join('\n');

    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_senai_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    if (formularios.length === 0) return;
    
    const doc = new jsPDF();
    
    // Logo SENAI em Base64 para selo personalizado
    const senaiLogoBase64 = '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';
    doc.addImage(senaiLogoBase64, 'PNG', 14, 10, 36, 12);
    
    // Header styling
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(204, 0, 0); // Vermelho SENAI
    doc.text('Relatório Oficial', 14, 34);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Data de geração: ${new Date().toLocaleString('pt-BR')}`, 14, 40);
    doc.text('Sistema de Gestão SENAI DF - Módulo de Atendimento', 14, 45);

    // Line separator
    doc.setDrawColor(230, 230, 230);
    doc.line(14, 50, 196, 50);
    
    const headers = [['Tipo', 'Solicitante', 'Contato', 'Status', 'Data']];
    const data = formularios.map(f => [
      getTipoLabel(f.tipo).toUpperCase(),
      f.nome,
      `${f.email || ''}\n${f.telefone || ''}`,
      f.status.toUpperCase(),
      new Date(f.created_at).toLocaleDateString('pt-BR')
    ]);

    autoTable(doc, {
      startY: 55,
      head: headers,
      body: data,
      theme: 'grid',
      headStyles: { 
        fillColor: [204, 0, 0], // Vermelho SENAI
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: [70, 70, 70],
        valign: 'middle'
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: [40, 40, 40], cellWidth: 35 },
        1: { cellWidth: 40 },
        3: { halign: 'center', fontStyle: 'bold' },
        4: { halign: 'center' }
      },
      styles: { 
        fontSize: 9,
        cellPadding: 4,
        lineColor: [230, 230, 230]
      },
      didParseCell: function(data: any) {
        if (data.section === 'body' && data.column.index === 3) {
          if (data.cell.raw === 'NOVO') {
            data.cell.styles.textColor = [0, 92, 172]; // Azul
          } else if (data.cell.raw === 'RESPONDIDO') {
            data.cell.styles.textColor = [0, 153, 51]; // Verde
          }
        }
      }
    });

    const pageCount = (doc as any).internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }

    doc.save(`Relatorio_SENAI_DF_${new Date().getTime()}.pdf`);
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
                        <button 
                          className="p-1.5 text-slate-400 hover:text-senai-red hover:bg-red-50 rounded transition-colors" 
                          title="Ver detalhes"
                          onClick={() => setSelectedForm(form)}
                        >
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

      {/* MODAL DE DETALHES DO FORMULÁRIO */}
      {selectedForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-full">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-lg font-black text-slate-800">Detalhes do {getTipoLabel(selectedForm.tipo)}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enviado em {new Date(selectedForm.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
              <button 
                onClick={() => setSelectedForm(null)}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nome Completo</span>
                  <p className="text-sm font-bold text-slate-700">{selectedForm.nome}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Contato</span>
                  <p className="text-sm text-slate-700 font-medium">{selectedForm.email || 'Sem e-mail'}</p>
                  <p className="text-sm text-slate-700 font-medium">{selectedForm.telefone || 'Sem telefone'}</p>
                </div>
              </div>

              {selectedForm.mensagem && (
                <div className="mb-6">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mensagem / Dúvida</span>
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {selectedForm.mensagem}
                  </div>
                </div>
              )}

              {selectedForm.dados_adicionais && Object.keys(selectedForm.dados_adicionais).length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Informações Adicionais</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    {Object.entries(selectedForm.dados_adicionais).map(([key, value]) => (
                      <div key={key}>
                        <span className="block text-[11px] font-bold text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <p className="text-sm font-medium text-slate-800">{String(value) || '-'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" className="bg-white" onClick={() => setSelectedForm(null)}>Fechar</Button>
              <Button className="bg-senai-red hover:bg-red-700 text-white">Marcar como Respondido</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
