# Manual de Usuario: Generador de Fotos Carnet IA
*Desarrollado para Xiphias Consulting • Licencia Joya*

---

## 1. Introducción
El **Generador de Fotos Carnet IA** es una herramienta web profesional diseñada para automatizar, alinear, corregir y compilar fotografías de identificación y documentos oficiales en pliegos de impresión de alta resolución. La interfaz está optimizada para su uso tanto en computadoras de escritorio como en dispositivos móviles de pantalla táctil.

---

## 2. Pantalla de Bienvenida y Formatos
Al ingresar a la aplicación, se presenta la pantalla de selección de formatos oficiales. Cada formato cuenta con un código de color específico para la interfaz:

*   **Pasaporte (Azul):** Formato oficial de 2x2" (600 x 600 px, relación de aspecto 1:1).
*   **Carnet Oficial (Morado):** Formato estándar de 3x4 cm (600 x 800 px, relación de aspecto 3:4).
*   **Digital INTT (Verde):** Formato oficial para la renovación de licencia de tránsito en el sistema INTT (448 x 336 px, relación de aspecto 4:3 en formato horizontal por normativa oficial). Dispone de dos pestañas independientes: **Foto Carnet** y **Selfie + Cédula** para preparar ambos recaudos.
*   **Cédula de Identidad (Dorado/Ámbar):** Formato estándar de 8.5x5.7 cm (1004 x 673 px, relación de aspecto 1.5:1). Permite cargar de forma independiente el **Anverso (Frente)** y el **Reverso (Dorso)**.

---

## 3. Métodos de Carga de Imagen
Tienes dos formas de cargar imágenes al área de edición:
1.  **Arrastrar y Soltar (Drag & Drop):** Arrastra una imagen directamente desde tu computadora sobre la zona de edición.
2.  **Explorador de Archivos:** Haz clic en **"Seleccionar Imagen"** para abrir el explorador de tu dispositivo.
3.  **Captura en Vivo (Cámara):** Haz clic en **"Usar Cámara"** para habilitar la webcam del dispositivo.

---

## 4. Módulo de Cámara y Captura
Al activar la cámara web, dispones de una barra de herramientas flotante:

*   **Temporizador (Timer):** Haz clic para alternar entre Desactivado, 3 segundos y 5 segundos. La cuenta regresiva se muestra en el centro de la pantalla.
*   **Linterna (Torch):** Si tu celular dispone de flash LED trasero y accedes mediante una conexión segura (HTTPS), este botón encenderá la linterna como luz de apoyo.
*   **Giro de Cámara:** Alterna entre la cámara frontal y la trasera de tu teléfono móvil.
*   **HUD de Nivelación (Giroscopio):**
    *   Diseñado como un visor holográfico concéntrico que detecta la inclinación de tu teléfono.
    *   **Modo Dual Inteligente:** Se calibra automáticamente según lo que captures:
        *   *Modo Vertical / Horizonte Artificial:* Para retratos (Pasaporte, Carnet e INTT). Oculta la burbuja tradicional y muestra un **Horizonte Artificial** (barra y línea de referencia aeronáuticas) que rota según la inclinación lateral (roll) y sube/baja según la verticalidad (pitch). Ayuda a que tu móvil esté recto y paralelo frente a tus ojos.
        *   *Modo Plano / Nivel de Burbuja:* Para escaneo de documentos (Cédula). Muestra una burbuja circular clásica que debes centrar para asegurar que el móvil esté paralelo a la mesa.
    *   **Aro de Difuminado Inteligente:** Muestra un círculo difuminado (15% más grande que la mira de alineación) alrededor del nivel para evitar distracciones en el fondo.
    *   **Indicador de Enfoque:** Al alinear el dispositivo en la orientación correspondiente (inclinación $\le 3^\circ$), el aro difuminado se aclara al 100%, el indicador (horizonte o burbuja) se encaja al centro en verde esmeralda y muestra el texto **"Alineado ✓"**.
*   **Destello de Flash:** Al presionar el botón de captura, la pantalla simula un flash fotográfico de color blanco antes de congelar la imagen.

---

## 5. Módulo de Corrección: Escáner 3D (Perspectiva y Recorte)
Ideal para fotografías de cédulas o documentos que han sido tomados con inclinación o en perspectiva tridimensional.

1.  Haz clic en el botón **"Escáner 3D"**. 
2.  La imagen se reseteará a su escala natural para permitirte una visibilidad total y se desplegarán **4 manejadores circulares naranjas** en las esquinas de la foto.
3.  Arrastra cada círculo hacia las cuatro esquinas reales de tu documento (Cédula o carnet).
4.  **Confirmar Recorte:** El botón cambiará de color y texto a **"✓ Aplicar Escáner"**. Haz clic en él para confirmar la selección. La app aplanará la perspectiva del área seleccionada, la recortará y la encuadrará de manera automática en el canvas central.
5.  **Reajustar:** Si no te convence el resultado, el botón ahora mostrará **"Reajustar Escáner"**. Haz clic nuevamente para ajustar las esquinas anteriores y volver a aplicar.

---

## 6. Panel de Ajustes y Edición
Una vez cargada o capturada la foto, los siguientes controles interactivos se habilitan en paneles colapsables:

*   **Ajustes de Encuadre:**
    *   *Zoom:* Aumenta o disminuye la escala de la imagen.
    *   *Desplazamiento:* Puedes arrastrar (panear) con el mouse o con un dedo táctil la foto en cualquier dirección dentro del lienzo de corte.
    *   *Rotación y Espejo:* Gira la imagen en incrementos de 90° o inviértela horizontalmente con el efecto espejo.
*   **Filtros de Fondo (Chroma Key IA):**
    *   Detecta automáticamente el color del fondo (por ejemplo, el de la pared de tu captura) y te permite cambiarlo a un **Fondo Blanco Puro** o **Fondo Azul Oficial** de manera instantánea.
*   **Efectos de Textura de Papel:**
    *   *Brillante (Glossy):* Agrega un reflejo diagonal plástico de luz realista sobre la foto.
    *   *Mate (Matte):* Imprime un grano de emulsión fino y lavado suave simulando papel fotográfico mate tradicional.

---

## 7. Exportación y Plantillas de Impresión
En la parte inferior de la sección de controles encontrarás las opciones de salida de alta resolución a 300 DPI:

1.  **Formatos de Pliego:**
    *   *Foto Única:* Descarga únicamente la fotografía recortada con las dimensiones del preset.
    *   *Pliego 4x6":* Distribuye las fotos en una hoja estándar de laboratorio fotográfico.
    *   *Pliego Carta / A4 / Oficio:* Genera una hoja lista para imprimir en tu impresora de casa u oficina con el número óptimo de fotos alineadas.
2.  **Calidad de Compresión:** Ajusta el nivel de calidad del archivo JPEG (entre 50% y 100%). La aplicación estimará dinámicamente el tamaño del archivo resultante en KB/MB.
3.  **Exportación:** Haz clic en **"Exportar Foto de Alta Calidad"** para procesar y descargar el archivo final en tu dispositivo de inmediato.

---

> [!IMPORTANT]
> Para utilizar la cámara y el giroscopio de nivelación en dispositivos móviles, recuerda acceder al servidor utilizando la dirección IP de tu red local y otorgar los permisos de cámara y movimiento cuando el navegador lo solicite.
