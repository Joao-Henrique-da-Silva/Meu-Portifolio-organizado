import { useState, useEffect } from 'react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  const { repos, loading, error } = useGitHubRepos();
  const [search, setSearch] = useState('');
  const [filterLang, setFilterLang] = useState('');
  const [isDark, setIsDark] = useState(false);

  // Observa mudanças no tema
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    setIsDark(document.documentElement.classList.contains('dark'));
    
    return () => observer.disconnect();
  }, []);

  const languages = ['Todas', ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filteredRepos = repos.filter((repo) => {
    const matchName = repo.name.toLowerCase().includes(search.toLowerCase());
    const matchLang = filterLang === '' || filterLang === 'Todas' || repo.language === filterLang;
    return matchName && matchLang;
  });

  // Cores dinâmicas para os inputs
  const inputBg = isDark ? 'bg-dark-card' : 'bg-white';
  const inputBorder = isDark ? 'border-dark-border focus:border-dark-secondary' : 'border-card-border focus:border-secondary';
  const inputText = isDark ? 'text-dark-text' : 'text-card-text';
  const inputPlaceholder = isDark ? 'placeholder:text-dark-text-muted' : 'placeholder:text-[#A08070]';
  const inputRing = isDark ? 'focus:ring-dark-secondary/20' : 'focus:ring-secondary/20';
  const sectionBg = isDark ? 'bg-dark-card' : 'bg-section-bg';

  if (loading) {
    return (
      <section id="projetos" aria-labelledby="projects-title" className={`py-16 ${sectionBg} min-h-100 flex items-center justify-center transition-colors duration-300`}>
        <div className="text-center">
          <div className="animate-spin text-4xl text-secondary dark:text-dark-secondary">🌀</div>
          <p className="mt-4 text-primary dark:text-dark-primary font-medium">Carregando projetos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projetos" aria-labelledby="projects-title" className={`py-16 ${sectionBg} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 text-center text-red-600 dark:text-red-400">
          <p>Erro ao carregar projetos: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projetos" aria-labelledby="projects-title" className={`py-16 ${sectionBg} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary dark:text-dark-primary text-center mb-10 relative">
          Meus Projetos no GitHub
          <span className="block w-12 h-1 bg-secondary dark:bg-dark-secondary mx-auto mt-2 rounded transition-colors duration-300"></span>
        </h2>

        {/* === BARRA DE BUSCA E FILTRO === */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <input
            type="text"
            placeholder="🔍 Buscar por nome..."
            aria-label="Buscar projetos por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full sm:w-64 px-4 py-2.5 rounded-xl border ${inputBorder} 
                       focus:outline-none focus:ring-2 ${inputRing}
                       ${inputBg} ${inputText} ${inputPlaceholder}
                       transition-all duration-300`}
          />

          <select
            value={filterLang}
            onChange={(e) => setFilterLang(e.target.value)}
            className={`w-full sm:w-48 px-4 py-2.5 rounded-xl border ${inputBorder} 
                       focus:outline-none focus:ring-2 ${inputRing}
                       ${inputBg} ${inputText}
                       transition-all duration-300 cursor-pointer`}
            aria-label="Filtrar projetos por linguagem"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Grid de projetos com animação em cascata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredRepos.map((repo, index) => (
            <div 
              key={repo.id} 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index % 5 + 1) * 100}ms` }}
            >
              <ProjectCard {...repo} />
            </div>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#A08070] dark:text-dark-text-muted">
              Nenhum projeto encontrado com os filtros atuais.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setFilterLang('');
              }}
              className="mt-4 text-secondary dark:text-dark-secondary hover:underline transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}