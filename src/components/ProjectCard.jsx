import { FaGithub, FaGlobe, FaHtml5, FaCss3Alt, FaJs, FaReact, FaCode, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export function ProjectCard({ name, description, language, html_url, homepage, className = '' }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  const isExternal = !!homepage && homepage !== html_url;

  // Mapeamento de ícones por linguagem (mantendo as cores originais)
  const iconMap = {
    HTML: <FaHtml5 className="text-2xl text-orange-600 dark:text-orange-400" aria-hidden="true" />,
    CSS:  <FaCss3Alt className="text-2xl text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    JavaScript: <FaJs className="text-2xl text-yellow-500 dark:text-yellow-300" aria-hidden="true" />,
    TypeScript: <FaCode className="text-2xl text-blue-700 dark:text-blue-300" aria-hidden="true" />,
    React: <FaReact className="text-2xl text-cyan-600 dark:text-cyan-400" aria-hidden="true" />,
  };
  const icon = iconMap[language] || <FaCode className="text-2xl text-gray-600 dark:text-gray-400" aria-hidden="true" />;

  // ===== ESTILOS ORIGINAIS (mantidos) =====
  const iconColor = isDark ? 'text-dark-primary' : 'text-secondary';
  const cardBg = isDark ? 'bg-dark-card' : 'bg-white';
  const cardBorder = isDark ? 'border-dark-border' : 'border-card-border';
  const shadow = isDark 
    ? 'shadow-dark-card hover:shadow-[0_12px_32px_rgba(108,60,176,0.3)]' 
    : 'shadow-card hover:shadow-[0_12px_32px_rgba(139,0,0,0.12)]';
  const hoverBorder = isDark ? 'hover:border-dark-secondary' : 'hover:border-secondary';
  const badgeBg = isDark ? 'bg-dark-badge' : 'bg-badge-bg';
  const badgeText = isDark ? 'text-dark-primary' : 'text-primary';
  const titleColor = isDark ? 'text-dark-primary' : 'text-card-title';
  const descColor = isDark ? 'text-dark-text' : 'text-card-text';
  const footerColor = isDark ? 'text-dark-primary' : 'text-primary';
  const footerBorder = isDark ? 'border-dark-border' : 'border-card-border';
  const btnBg = isDark 
    ? 'bg-dark-secondary group-hover:bg-[#8B5CF6]' 
    : 'bg-secondary group-hover:bg-primary';
  const textMuted = isDark ? 'text-dark-text-muted' : 'text-[#7a4a3a]';

  return (
    <a
      href={homepage || html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} – ${isExternal ? 'Visitar site' : 'Ver no GitHub'} (abre em nova aba)`}
      className={`group ${cardBg} rounded-2xl p-6 ${shadow} 
                 border ${cardBorder} transition-all duration-300 
                 hover:-translate-y-1.5 ${hoverBorder} flex flex-col gap-2
                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 ${isDark ? 'focus:ring-dark-secondary focus:ring-offset-dark-card' : 'focus:ring-secondary focus:ring-offset-white'}`}
    >
      {/* Cabeçalho: ícone + linguagem */}
      <div className={`flex justify-between items-center text-sm ${textMuted}`}>
        {icon}
        <span className={`${badgeBg} ${badgeText} px-3 py-0.5 rounded-full text-xs font-semibold transition-colors duration-300`}>
          {language || 'Sem linguagem'}
        </span>
      </div>

      {/* Título e descrição */}
      <h3 className={`text-lg font-bold ${titleColor} mt-1 transition-colors duration-300`}>
        {name}
      </h3>
      <p className={`text-sm ${descColor} flex-1 mb-1 transition-colors duration-300`}>
        {description || 'Sem descrição'}
      </p>

      {/* Rodapé: link + botão */}
      <div className={`flex justify-between items-center text-sm ${footerColor} border-t ${footerBorder} pt-3 mt-1 transition-colors duration-300`}>
        <span className="flex items-center gap-1.5">
          {isExternal ? <FaGlobe aria-hidden="true" className="text-sm" /> : <FaGithub aria-hidden="true" className="text-sm" />}
          {isExternal ? 'Visitar site' : 'Ver no GitHub'}
        </span>
        <span 
          className={`${btnBg} text-white w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 group-focus:ring-2 group-focus:ring-offset-2 ${isDark ? 'focus:ring-dark-secondary focus:ring-offset-dark-card' : 'focus:ring-secondary focus:ring-offset-white'}`}
          aria-hidden="true"
        >
          <FaArrowRight className="text-xs" />
        </span>
      </div>
    </a>
  );
}