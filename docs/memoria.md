---
title: Selector de grupos
subtitle: Práctica final -- Interacción Persona Ordenador
date: 30 de Mayo de 2016
toc: true
fontsize: 11pt
csl: acm-sig-proceedings.csl
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

# Bibliografía
