# Лабораторная работа №6. Асинхронный JavaScript: API и хранилище

# Скриншоты
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/84e24096-58a9-41f4-a3ec-56f90ea687b9" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ef5f488f-a7a7-4e0b-b360-af587a299fe7" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/25eb4404-2e6a-4260-8620-9724a2528993" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4cbc905d-8aab-4eba-b9a8-bf167216d34b" />

# Ответы на вопросы:
## Что делает fetch?
### fetch отправляет HTTP-запрос на указанный URL. По умолчанию это GET-запрос. Функция возвращает Promise, который разрешается объектом Response. Для получения данных в формате JSON нужно вызвать response.json().
## Зачем нужны async/await?
### async делает функцию асинхронной, await позволяет "подождать" завершения Promise внутри async-функции и получить его результат синхронно по смыслу.
## Как работает localStorage?
### localStorage — это встроенное в браузер хранилище ключ–значение, которое позволяет сохранять данные в виде строк на стороне клиента. Данные сохраняются даже после закрытия браузера и доступны при последующих визитах на тот же сайт.
## Где помог ИИ, а где пришлось разбираться вручную?
### ИИ сгенерировал код для работы с localStorage и обращения к API через fetch. Самостоятельно была исправлена ошибка, из-за которой невозможно было получить случайные цитаты для отзывов.
