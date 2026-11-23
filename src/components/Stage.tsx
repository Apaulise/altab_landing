const INPUTS = [
  { name: "WhatsApp", meta: "142 consultas" },
  { name: "CRM", meta: "clientes" },
  { name: "Instagram", meta: "mensajes" },
];

const OUTPUTS = ["Datos", "Acción", "Automatización"];

const STATS: { k: string; v: string }[] = [
  { k: "Procesos automatizados", v: "12" },
  { k: "Horas recuperadas", v: "34 h" },
  { k: "Consultas analizadas", v: "142" },
  { k: "Eficiencia", v: "+27%" },
];

export default function Stage() {
  return (
    <section className="section landing-flow" aria-labelledby="flow-title">
      <div className="wrap flow-wrap">
        <div data-reveal className="flow-board">
          <div className="flow-board-header">
            <h2 id="flow-title">De tus canales a la acción</h2>
            <span className="flow-label flow-example mono">Ejemplo ilustrativo</span>
          </div>

          <div className="flow">
            <div className="flow-group">
              <span className="flow-label mono">Entradas</span>
              <div className="flow-row">
                {INPUTS.map((input) => (
                  <div className="flow-node" key={input.name}>
                    <b>{input.name}</b>
                    <span className="mono">{input.meta}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flow-pipe" aria-hidden="true"><i /></div>

            <div className="flow-core">
              <span className="flow-core-icon" aria-hidden="true">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
                  <circle cx="12" cy="12" r="3.2" />
                </svg>
              </span>
              <span className="flow-core-copy">
                <b>Capa de inteligencia</b>
                <span className="mono">Analiza · decide · ejecuta</span>
              </span>
            </div>

            <div className="flow-pipe" aria-hidden="true"><i style={{ animationDelay: ".8s" }} /></div>

            <div className="flow-group">
              <span className="flow-label mono">Salidas</span>
              <div className="flow-row">
                {OUTPUTS.map((output) => (
                  <div className="flow-node" key={output}>
                    <b>{output}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <dl className="flow-stats">
            {STATS.map(({ k, v }) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd className="mono">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
