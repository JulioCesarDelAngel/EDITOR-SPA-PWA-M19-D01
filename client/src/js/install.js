const butInstall = document.getElementById('buttonInstall');

// Lógica para instalar la PWA
// TODO: Agregar un controlador de eventos al evento `beforeinstallprompt`
window.addEventListener('beforeinstallprompt', (event) => {
  // Almacenar los eventos activados
  window.deferredPrompt = event;
  // Eliminar la clase oculta del botón.
  //butInstall.classList.toggle('hidden', false);
  butInstall.style.visibility = 'visible';

});

// TODO: Implementar un controlador de eventos de clic en el elemento `butInstall`
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
     return;
    }
    // Mostrar la pregunta
    promptEvent.prompt();    
    // Restablecer la variable de pregunta diferida; solo puede usarse una vez.
    window.deferredPrompt = null;  

    //butInstall.classList.toggle('hidden', true);  
    butInstall.style.visibility='hidden';
});

// TODO: Agregar un controlador para el evento `appinstalled`
window.addEventListener('appinstalled', (event) => {
  // Borrar la pregunta
  window.deferredPrompt = null; 
});
