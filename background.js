console.log("¡Hola desde background.js! El script se está ejecutando.");

// --- ACCIÓN 1: ABRIR LA PÁGINA WEB AL HACER CLIC EN EL ÍCONO ---
chrome.action.onClicked.addListener(() => {
  // ¡IMPORTANTE! Esta es la URL con el enlace a la web de Fusiva en GitHub Pages.
  chrome.tabs.create({ url: "https://blau-fe.github.io/pagina-fusiva/" });
});

// --- ACCIÓN 2: CREAR LA ALARMA SEMANAL ---
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extensión instalada. Programando alarma para el próximo viernes.");
  
  chrome.alarms.create('fridayReminder', {
    when: getNextFriday10AM(), // Calcula cuándo será el próximo viernes a las 10 AM
    periodInMinutes: 7 * 24 * 60 // Repetir cada semana (10080 minutos)
  });
});

// --- ACCIÓN 3: MOSTRAR LA NOTIFICACIÓN CUANDO SUENE LA ALARMA ---
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fridayReminder') {
    chrome.notifications.create('pageReminderNotification', {
      type: 'basic',
      iconUrl: 'imagenes/icono128.png',
      title: '¡Es viernes de aporte!',
      message: 'No olvides ingresar a la página para llenar tu aporte semanal. ¡Haz clic aquí!',
      priority: 2
    });
  }
});

// --- ACCIÓN 4: ABRIR LA PÁGINA WEB AL HACER CLIC EN LA NOTIFICACIÓN ---
chrome.notifications.onClicked.addListener(() => {
   
    chrome.tabs.create({ url: "https://blau-fe.github.io/pagina-fusiva/" });
});


// --- FUNCIÓN AUXILIAR: CALCULAR EL PRÓXIMO VIERNES A LAS 10 AM ---
function getNextFriday10AM() {
  const now = new Date();
  const targetDay = 5; // 0=Domingo, 1=Lunes, ..., 5=Viernes
  let resultDate = new Date();
  
  let daysUntilFriday = targetDay - now.getDay();
  if (daysUntilFriday < 0 || (daysUntilFriday === 0 && now.getHours() >= 10)) {
    // Si ya pasó el viernes a las 10am de esta semana, programa para la siguiente.
    daysUntilFriday += 7;
  }
  
  resultDate.setDate(now.getDate() + daysUntilFriday);
  resultDate.setHours(10, 0, 0, 0); // Fija la hora a las 10:00:00 AM
  
  return resultDate.getTime();
}