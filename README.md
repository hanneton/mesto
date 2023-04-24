# Проект: Путешествие по России

В этой проектной работе я применил БЭМ-методологию по организации проекта – **Nested**. Также, наименование всех классов выполнено согласно БЭМ. Повсеместно использовал семантичные теги. 
Помимо этого, пользовался гридами и флексами. Частично использовал абсолютное и фиксированное позиционирование.  Страница сверстана адаптивно и резиново.
С помощью ванильного js реализованы **поп-ап окна**:
* изменения пользовательской информации (имя, сфера деятельности, аватар)
* добавления пользовательского контента на страницу
* просмотра фото в крупном размере
* удаление карточек, добавленных юзером

Первоначальный набор карточек добавляется с помощью API запроса к серверу, есть возможность добавлять/удалять собственные карточки, ставить/снимать лайки карточкам. Все изменения на сайте так же сопровождаются API запросами.

Структура проекта организована с помощью ООП: логика попапов, валидация форм, содержимое карточек и тд реализованы в отдельных классах с собственными методами. Классы имеют слабую связь друг с другом.

Проект собирается Вебпаком, в рез-те чего код транпсилируется и минифицируется.

## Используемые технологии:
* HTML
* CSS
* JS

## Ссылка на проект
[Путешествие по России](https://hanneton.github.io/mesto/index.html)
