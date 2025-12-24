'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, RefreshCw, MessageCircle, Flame, Vote, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- DATA ARRAYS ---
const DATA = {
  votacion: [
    "Si hay un apocalipsis zombie, ¿quién es la primera en morir?",
    "¿Quién es más probable que se haga viral por accidente?",
    "Si ganamos la lotería, ¿quién se gastaría todo en una semana?",
    "¿Quién sobreviviría más tiempo en una isla desierta?",
    "¿A quién le darías la contraseña de tu celular sin miedo?",
    "¿Quién tiene más chances de terminar viviendo en otro país?",
    "¿Quién es la 'mamá' del grupo que pone orden?",
    "¿Quién es la que siempre tiene el chisme antes que nadie?",
    "¿Quién es la que llora con cualquier publicidad emotiva?",
    "¿Quién ganaría MasterChef Celebrity?",
    "¿Quién es la más probable que se tropiece con su propia sombra?",
    "¿Quién se olvida de su propio cumpleaños?",
    "¿Quién es capaz de adoptar 5 gatos callejeros en un día?",
    "¿Quién sería presidenta de la Nación?",
    "¿Quién pierde las llaves o el celular al menos una vez por semana?",
    "¿Quién no se despierta ni aunque haya un terremoto?",
    "¿Quién guarda cosas 'por las dudas' y tiene la casa llena?",
    "¿Quién es el mejor hombro para llorar?",
    "¿Quién es la más fácil de convencer para salir (la 'sí fácil')?",
    "¿Quién responde los mensajes de WhatsApp mentalmente y nunca los manda?",
    "¿Quién sería la mejor copiloto en un viaje largo?",
    "¿Quién tiene una vida secreta que no conocemos?",
    "¿Quién es la 'guerrera de oración' a la que llamás primero cuando pasa algo?",
    "¿Quién tiene el mejor gusto para vestirse?",
    "¿Quién es la más mañosa con la comida?",
    "¿Quién siempre tiene frío (incluso en verano)?",
    "¿Quién es la que siempre organiza las salidas?",
    "¿Quién es la más probable que se ría en un momento súper serio?",
    "¿Quién tiene más paciencia de todas nosotras?"
  ],
  polemica: [
    "La pizza con ananá: ¿Manjar o crimen?",
    "Los audios de WhatsApp de más de 2 minutos deberían estar prohibidos.",
    "La menta granizada es pasta de dientes congelada.",
    "Dormir con medias: ¿Necesidad o psicopatía?",
    "El invierno es infinitamente superior al verano.",
    "Spoilear una serie es motivo de ruptura de amistad.",
    "Salir a merendar es mejor plan que salir a cenar.",
    "El sushi está sobrevalorado.",
    "¿Mate dulce o amargo? Defendé tu postura a muerte.",
    "Las empanadas de carne: ¿Con o sin pasas de uva?",
    "¿Team Batata o Team Membrillo?",
    "La tortilla de papas: ¿Babé o bien cocida?",
    "El bidet: ¿Elemento esencial de la civilización o innecesario?",
    "Usar Crocs en público: ¿Comodidad o atentado a la moda?",
    "El agua con gas: ¿Delicia o sabe a remedio?",
    "Pochoclos en el cine: ¿Dulces o salados?",
    "Planchar las sábanas: ¿Signo de pulcritud o pérdida de tiempo?",
    "Bañarse: ¿A la mañana para despertar o a la noche para dormir?",
    "Series: ¿Subtituladas (voces originales) o Dobladas?",
    "¿Sos persona de Perros o de Gatos?",
    "Harry Potter está sobrevalorado.",
    "Ponerle mayonesa o ketchup a la pizza: ¿Se acepta?",
    "El chocolate blanco NO es chocolate.",
    "Alfajor de fruta: ¿Rico o debería extinguirse?",
    "Vacaciones: ¿Camping aventura o Hotel All Inclusive?",
    "Clavar el visto: ¿Es de mala educación o es normal?",
    "Mandar 5 audios de 10 segundos o 1 audio de 50 segundos.",
    "Andar descalza en casa: ¿Placer o te enfermás?",
    "Compartir la comida del plato: ¿Acto de amor o 'ni se te ocurra tocar mis papas'?"
  ],
  anecdota: [
    "Contá tu peor papelón en público (o uno del top 3).",
    "¿Cuál fue la compra más inútil que hiciste en tu vida?",
    "Una situación 'trágame tierra' con algún chico/cita.",
    "Tu mayor desastre en la cocina.",
    "¿Alguna vez te olvidaste la letra de una canción en público?",
    "Contá una travesura de cuando eras chica que tus papás se enteraron tarde.",
    "El regalo más feo o raro que recibiste y tuviste que fingir que te gustaba.",
    "¿Cuál fue tu primer trabajo y qué tal te fue?",
    "Ese ataque de risa incontrolable en el peor momento (ej: iglesia/acto/funeral).",
    "Tu peor experiencia en un viaje o vacaciones.",
    "Un cambio de look del que te arrepentiste al instante.",
    "El malentendido más gracioso que tuviste por WhatsApp.",
    "Algo que rompiste y escondiste la evidencia.",
    "Un miedo irracional o tonto que tengas.",
    "¿Alguna vez te confundiste de persona en la calle y saludaste?",
    "El corte de pelo más desastroso de tu infancia.",
    "Una mentira piadosa que se te fue de las manos.",
    "El momento exacto en que te sentiste una 'señora' mayor.",
    "La caída más graciosa que tuviste.",
    "Algo valioso que perdiste y nunca encontraste (o encontraste años después).",
    "El sueño más raro o bizarro que te acuerdes.",
    "Cuando intentaste cocinar algo 'especial' para alguien y falló.",
    "Un problema de vestuario (se rompió/manchó) en público.",
    "¿Alguna vez te quedaste encerrada en algún lado?",
    "La comida más rara que probaste y si te gustó.",
    "¿Hiciste alguna broma telefónica de chica?",
    "¿Te encontraste alguna vez con un famoso? (o creíste que era).",
    "Tu anécdota favorita con una mascota."
  ],
  prenda: [
    "Mostrá la última foto de tu galería (sin explicar contexto).",
    "Leenos tu última búsqueda en Google.",
    "Mostrá el sticker más raro que tengas guardado en favoritos.",
    "Mandale un audio ahora mismo a alguien cercano diciendo 'Te quiero mucho' sin contexto.",
    "Dejanos ver tu tiempo de uso de pantalla de hoy (Screen Time).",
    "Poné en altavoz tu último audio de WhatsApp recibido.",
    "Sacate una selfie ya mismo con la cara más fea que te salga y mandala al grupo.",
    "Mostrá qué tenés en tu cartera/bolso ahora mismo.",
    "Mostrá los últimos 3 emojis que usaste.",
    "Leenos la última nota que escribiste en tu app de Notas.",
    "Imitá a una de las chicas del grupo (nosotras adivinamos quién es).",
    "Mandale un GIF sin sentido a la tercera persona de tu chat de WhatsApp.",
    "Mostranos los videos recomendados de tu youTube.",
    "Dejá que el grupo elija tu foto de perfil de WhatsApp por 1 hora.",
    "Contá el chiste más malo que sepas.",
    "Mostranos tu fondo de pantalla (bloqueo y home).",
    "Cantá el estribillo de tu canción favorita.",
    "Mostranos la sección 'Seguir viendo' de tu Netflix/Disney+.",
    "Leé en voz alta el último SMS que recibiste (seguro es un código o spam).",
    "Buscá la foto más vieja que tengas en el celular y mostrala.",
    "Mandá al grupo un emoji que NUNCA uses.",
    "Dejá que la de tu derecha escriba un estado de WhatsApp en tu cel.",
    "Mostranos a qué hora tenés puestas las alarmas.",
    "Confesá cuál es tu serie/película/música favorita incomprendida por la humanidad.",
  ],
};

// --- TYPES ---
type CategoryKey = keyof typeof DATA;

interface CategoryConfig {
  id: CategoryKey;
  label: string;
  color: string;
  icon: React.ElementType;
  bg: string;
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'votacion', label: 'Votación', color: 'bg-blue-600', icon: Vote, bg: 'from-blue-900 to-slate-900' },
  { id: 'polemica', label: 'Polémica', color: 'bg-rose-600', icon: Flame, bg: 'from-rose-900 to-slate-900' },
  { id: 'anecdota', label: 'Anécdota', color: 'bg-emerald-600', icon: MessageCircle, bg: 'from-emerald-900 to-slate-900' },
  { id: 'prenda', label: 'Prenda', color: 'bg-violet-600', icon: Camera, bg: 'from-violet-900 to-slate-900' },
];

export default function GirlsNightApp() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryConfig | null>(null);
  const [currentCard, setCurrentCard] = useState<string>("");

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FFD700', '#00BFFF'] // Colores chicas
    });
  };

  const handleSelectCategory = (category: CategoryConfig) => {
    setSelectedCategory(category);
    pickRandomCard(category.id);
    if (category.id === 'votacion') triggerConfetti(); 
  };

  const pickRandomCard = (catId: CategoryKey) => {
    const array = DATA[catId];
    const random = array[Math.floor(Math.random() * array.length)];
    setCurrentCard(random);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCurrentCard("");
  };

  return (
    <main className={`min-h-screen w-full transition-colors duration-700 ease-in-out flex flex-col items-center justify-center p-4 overflow-hidden
      ${selectedCategory ? `bg-gradient-to-br ${selectedCategory.bg}` : 'bg-slate-950'} text-white relative`}>
      
      {/* Background Ambient Effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

      <AnimatePresence mode="wait">
        
        {/* --- HOME VIEW --- */}
        {!selectedCategory ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-5xl text-center z-10"
          >
            <motion.div 
              initial={{ y: -50 }} animate={{ y: 0 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg font-serif">
                THE GIRLS NIGHT
              </h1>
              <p className="text-slate-400 mt-4 text-xl tracking-widest uppercase">Piso 7 Edition</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.03, boxShadow: "0px 0px 30px rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectCategory(cat)}
                  className={`${cat.color} h-40 md:h-52 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-2xl border border-white/10 group transition-all`}
                >
                  <cat.icon size={48} className="text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
                  <span className="text-3xl md:text-4xl font-bold tracking-tight">{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          
          /* --- CARD VIEW --- */
          <motion.div 
            key="card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-full max-w-4xl z-10 flex flex-col items-center"
          >
            {/* Header: Botón volver y Título de categoría */}
            <div className="w-full flex justify-between items-center mb-8 px-4">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold"
              >
                <ArrowLeft size={20} /> Volver
              </button>
              <div className={`px-4 py-1 rounded-full border border-white/20 bg-white/10 flex items-center gap-2`}>
                <selectedCategory.icon size={16} />
                <span className="uppercase font-bold tracking-wider text-sm">{selectedCategory.label}</span>
              </div>
            </div>

            {/* LA TARJETA GIGANTE */}
            <motion.div 
              key={currentCard}
              initial={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 md:p-20 rounded-3xl shadow-2xl w-full min-h-[400px] flex items-center justify-center text-center relative overflow-hidden"
            >
              {/* Decorative elements */}
              <Sparkles className="absolute top-4 right-4 text-yellow-300/50" size={40} />
              <Sparkles className="absolute bottom-4 left-4 text-yellow-300/50" size={24} />
              
              <h2 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-xl">
                {currentCard}
              </h2>
            </motion.div>

            {/* Footer: Botón Shuffle */}
            <div className="mt-12">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => pickRandomCard(selectedCategory.id)}
                className="bg-white text-slate-900 p-6 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow"
              >
                <RefreshCw size={32} />
              </motion.button>
              <p className="text-center text-white/40 mt-4 text-sm uppercase tracking-widest">Otra Tarjeta</p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}