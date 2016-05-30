---
title: Selector de grupos
subtitle: Práctica final -- Interacción Persona Ordenador
date: 30 de Mayo de 2016
toc: true
fontsize: 11pt
csl: acm-sigchi-proceedings.csl
lang: es
numbersections: true
babel-lang: spanish
bibliography: bibliography.bib
polyglossia-lang:
  options: []
  name: spanish
author:
  - Emilio Cobos Álvarez (70912324N)
abstract: |
  En esta práctica se realiza un diseño orientado al usuario de una interfaz
  para la distribución de personas en grupos de prácticas. Concretamente, este
  documento está centrado en el sistema de reparto de grupos y de permutas que
  sería controlado por el profesor.
---

# Introducción

El enunciado de la práctica deja ver un problema que todos los alumnos
y profesores de esta facultad conocemos, el problema de los cambios de grupo.

En esta práctica, me he propuesto hacer la labor del profesor más sencilla,
mediante una interfaz de usuario interactiva fácil de usar y visual.

## ¿Por qué centrarse en la labor del profesor?

No hay un sólo motivo por el que me haya centrado en esta práctica en este tipo
de interfaz, sino varios.

Interfaz central a la labor:
  ~ Si hubiera una sóla interfaz en un sistema de intercambio de grupos, sería
    esta.

    Aunque los sistemas de manejo de cursos actuales contienen herramientas para
    realizar esta tarea @moodle-group-change, son herramientas subestándar
    que, a pesar de que cumplen su labor, no escalan bien con una cantidad de
    alumnos elevada como la de los cursos de la Universidad de Salamanca, y no
    tienen ninguna ayuda visual para indicar cuándo los grupos están
    equilibrados y cuándo no.

Carga centrada sobre un usuario:
  ~ El uso de esta interfaz recae sobre un sólo usuario, que además suele estar
    bastante ocupado. Además de eso, suele ser una tarea recurrente para varios
    cursos[^even-more].

[^even-more]: Incluso, se podría argumentar que el facilitar la tarea del
profesor beneficia a los alumnos, tanto directamente (más tiempo del profesor
para preparar mejores clases), como indirectamente (menos estrés del profesor,
que suele ser mejor para todos).

Interfaz más flexible:
  ~ Esta actividad es sin duda la que más flexibilidad permite en cuanto al
    diseño de interfaces. Hay millones de posibles formas de organizar $n$
    alumnos en $k$ grupos.

    Si bien es cierto que las otras posibles interfaces relacionadas dan también
    bastante juego, ninguna le da el mismo.

Desafío técnico:
  ~ Aparte de todos los argumentos expuestos arriba (y con un peso mucho menor),
    la interfaz diseñada es lo suficientemente compleja e interactiva como para
    justificar el aprender una tecnología nueva, en este caso *React JS*
    @react-intro.

## Proceso ideal en el que entraría esta interfaz

Esta interfaz ha sido ideada en un *workflow* similar al que sigue:

 1. Creación de los grupos y distribución de los alumnos de forma automática,
    preferiblemente dando a elegir entre aleatoria, ordenada alfabéticamente,
    etc. Tras esto, los alumnos son notificados.

 2. Cada alumno puede solicitar un cambio de un grupo a otro, pero sólo a un
    grupo a la vez. Esto quedaría registrado en algún tipo de base de datos, de
    la que la interfaz obtiene los datos de la composición de grupos actual.

 3. *(opcional)* Cuando los tamaños de los grupos lo permitan, un sistema
    automático podría llevar a cabo permutas entre dos alumnos que hayan elegido
    grupos contrarios.

 4. El profesor realizaría las permutas y cambios que él considerara oportuno
    desde esta interfaz, donde se ve tanto la composición de grupos actual como
    los grupos preferidos por cada alumno, en el caso de que existan.

    Este proceso podría necesitar ser llevado a varias veces, de ahí la
    necesidad para que esta interfaz sea intuitiva, fácil y rápida de usar.

# Búsqueda de necesidades

La búsqueda de necesidades viene prácticamente explícita en enunciado, y es
clara. No tenía sentido realizar un proceso exhaustivo para reafirmar
las necesidades de la gente de hallar un sistema de cambio de personas más
amigable y productivo[^oh-well-potentially].

Aparte, la interfaz diseñada estaba explícitamente orientada a profesores, lo
que hace que sea, cuanto menos, complicado tomar contacto con ellos, más con las
limitaciones de tiempo que ha habido.

[^oh-well-potentially]: Bueno, potencialmente también se podría haber dado el
caso de que el enunciado estuviera equivocado, pero eso sería ir contra lo
evidente.

# Proceso de diseño de la interfaz

El proceso de diseño inicial de la interfaz fue, tal vez poco sorprendentemente,
directo. La idea básica en la cabeza del diseñador (es decir, yo), era clara,
y tener un diseño inicial no costó demasiado.

A partir de ahí, gracias a diferentes pruebas con los usuarios, se consiguió
llegar al diseño actual.

Se realizaron pruebas con 4 personas diferentes en tres diferentes etapas de
diseño, todas con la misma introducción de base. Estas pruebas resultaron ser
determinantes para mejorar la interfaz y validar su uso.

Adicionalmente, uno de ellos comparó el proceso con el proceso equivalente en
Moodle.

Ninguna de las personas que probaron la aplicación tenía experiencia previa con
ella, y todas poseían la misma información:

> Este es un sistema de cambio de grupos. Tienes que ponerte en el papel de un
> profesor organizando un curso. Tu objetivo es conseguir organizar los grupos
> de tal manera que queden compensados, y de tratar de evitar todos los
> conflictos de grupos entre los alumnos.

Tras eso, yo observaba al usuario usando la aplicación, obviamente sin revelar
ninguna información acerca de cómo utilizarla.

Si completaban el primer paso de forma satisfactoria, les pedía lo siguiente:

> Te ha llegado un correo de un alumno que no sabe utilizar el sistema
> automático de solicitud de cambio de grupo.
>
> Su DNI es el 70912324-N, y su nombre es Emilio. ¿Podrías moverlo al grupo $X$?

Donde $X$ era el grupo con menos alumnos donde no estuviera el alumno
correspondiente.

La idea de esta pregunta era valorar la utilidad de la búsqueda.

A continuación haremos un pequeño repaso de las diferentes experiencias que
tuvieron los usuarios, y las lecciones aprendidas de ellas.

## Primer diseño y prueba funcional

El primer diseño era algo rudo, he de reconocerlo. Tenía varias carencias
a nivel de facilidad de uso.

De hecho, el primer usuario entrevistado no supo reordenar los grupos, porque no
aparecía ninguna indicación con el cursor de que se pudieran arrastrar los
miembros de los grupos, lo cual fue un fallo enorme por mi parte.

## Segunda iteración sobre el diseño

En la segunda iteración sobre el diseño se añadió el cursor con la mano, y los
efectos `:hover` y de drag. Esto hizo que el segundo usuario consiguiera hacer
los grupos satisfactoriamente.

En esta interfaz, lo que ahora es una "etiqueta" con el grupo deseado y un
color, era un punto de color que al pasar el ratón por encima mostraba el grupo.

El usuario no supo interpretar esto, y por lo tanto los conflictos entre grupos
quedaron sin resolver.

Sí que usó, no obstante, la búsqueda adecuadamente, si bien dijo que le gustaría
ver el número de alumnos total del grupo aún filtrando.

## Tercera interacción sobre el diseño

La tercera interacción fue mucho más aceptable, a estas alturas ya se habían
incluido los cambios provocados por las anteriores iteraciones, aparte de
colores [estándar](https://flatuicolors.com/) en el diseño de interfaces para
mostrar grupos no balanceados.

La interacción fue rápida y sin ninguna objeción[^no-objections-except], que
consiguió realizar las tareas solicitadas sin ninguna ayuda en menos de un
minuto por tarea, algo que considero todo un logro.

[^no-objections-except]: Salvo que los datos no se quedaban guardados cuando
recargaba, algo que quedaba fuera de lugar para esta práctica.

### Comparativa con Moodle

Tras esto se pidió a la entrevistada que hiciera un cambio de grupos similar con
una versión estándar de Moodle (inicialmente montada para la asignatura de
administración de sistemas).

La respuesta fue clara, y cito textualmente:

> No hay color, es que la versión de Moodle es una chusta.

# Aspectos y consideraciones tomadas a la hora de diseñar la interfaz

Durante el diseño de esta interfaz se han tomado algunas consideraciones
importantes relacionadas con el diseño.

## Tipografía

Se ha usado la tipografía Fira Sans, en su version *light* para los títulos
y nombres de grupo, y en su versión normal para el resto de elementos de la
página, lo que le da un aspecto consistente a la vez que ligero.

## Escalabilidad

El hecho de que funcionara para cualquier número de grupos y alumnos es
extremadamente importante. Para ello se usó FlexBox @css-flexbox, que permite
que los elementos fluyan si sobrepasan el ancho, pero mantienen los de la misma
fila con el mismo alto.

Si el alto número de alumnos o grupos fuera un problema mayor del previsto, se
podría considerar hacer el interior del recuadro del grupo scrollable
verticalmente.

## Accesibilidad desde todo tipo de dispositivos

La página funciona bien independientemente de la resolución de pantalla y de si
se usa un ratón o un dedo para manejarlo. De hecho, se usa un back-end diferente
para la biblioteca de *drag and drop* si el navegador soporta touch-events o no:

```js
let selectedBackend = Html5Backend;
if (window.Modernizr && window.Modernizr.touchevents)
  selectedBackend = TouchBackend({ enableMouseEvents: true });
```

Sobre el tamaño de la pantalla, gracias a FlexBox no ha hecho falta nada más que
usar la etiqueta `<meta name="viewport">`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Nótese que aunque se hubiera podido utilizar el fragmento `user-scalable=no`,
para que el navegador no añada un delay artificial cuando se hace *drag and
drop* en los dispositivos móviles @mozhacks-touch-events, se ha elegido
mantener la capacidad de hacer zoom, pensando sobre todo en usuarios que
pudieran tener problemas de visión.

## Accesibilidad para todo tipo de personas

Se ha usado el módulo `react-a11y` para emitir errores si alguno de los
elementos básicos de accesibilidad se incumplía.

Esto sirvió en su momento para cazar un par de errores de accesibilidad de forma
automática, como etiquetas `<img>` sin atributo `alt`, y controles de formulario
sin `label`, haciendo un poco más usable la interfaz para la gente que usa
lectores de pantalla.

## Colores consistentes y fáciles de reconocer

Casi todos los diferentes estados tanto de un grupo como de un alumno se han
indicado con colores. Por ejemplo, cuando un grupo no está balanceado se usa un
color naranja, y cuando está vacío se usa el color rojo.

![Grupo no balanceado con usuario en grupo no deseado](img/group-users-ui-colors.png)

## Interacciones marcadas claramente

Todos los elementos que son susceptibles de interacción son marcados al paso del
ratón de una manera u otra. Este era uno de los problemas principals que se
encontraron cuando se probó con usuarios.

Así, por ejemplo, los elementos que se pueden arrastrar son marcados con un
cursor específico y son mínimamente escalados al pasar el ratón.

![Alumno arrastrable resaltado[^alumn-screenshot]](img/draggable-alumn.png)

[^alumn-screenshot]: Nótese que el cursor en la captura es el por defecto por
defecto del software de captura de pantalla.

Otro ejemplo de esto es que cuando estás arrastrando un alumno, los grupos donde
puedes dejarlo escalan también.

![Grupo donde se puede dejar un alumno[^group-screenshot]](img/droppable-group.png)

[^group-screenshot]: Al igual que anteriormente, el cursor no se ve en este
caso, pero se encuentra sobre el alumno transparente en el grupo resaltado. Ante
la duda, se recomienda probar la aplicación directamente.

# Conclusiones

En esta práctica se ha llevado a cabo el diseño de una interfaz usando los
principios del UCD.

Lo más remarcable de esta práctica en lo que a mi respecta, ha sido la extrema
utilidad del proceso de evaluación con los usuarios.

Concretamente, **a mi en la primera iteración me parecía un sistema perfectamente
claro y fácil de usar. Sin embargo, el primer usuario que lo probó ni siquiera
supo que podía arrastrar los usuarios**.

Sirva esta reflexión como reconocimiento personal a la importancia de las
técnicas relacionadas con el diseño centrado en el usuario.

Me hubiera gustado contar con más tiempo para haber podido hacer una evaluación
más extensa, y una búsqueda de necesidades muchísimo más en profundidad, no
obstante los exámenes apremian.

# Adjuntos

Aparte de las imágenes en esta memoria, se adjunta todo el código fuente, y un
vídeo con un ejemplo de uso si Moodle lo permite.

Para poner a ejecutar la aplicación en local, sólo hay que ejecutar:

```
$ npm install
$ npm start
```

Y abrir el navegador en la URL `http://localhost:5000`.

No obstante, hay una versión online en la dirección
`https://emiliocobos.net/ipo`.

# Bibliografía
