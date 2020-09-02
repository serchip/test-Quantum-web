# Quantum web test

Тестовое задание от компании Russian Quantum Center (Москва)

##Квантовый веб интерфейс

**1. Основная задача**

1.1. Реализовать веб-интерфейс для удаленного вычислительного модуля (см. архитектуру на рисунке 1)

![preview](/doc/ris1.png)

Рис. 1. Архитектура системы

1.2. Скетч frontend интерфейса представлен на рисунке 2.

![preview](/doc/ris2.png)

Рис. 2. Скетч веб-интерфейса

1.3. Основной сценарий использования системы описывается в несколько шагов:

- Пользователь открывает страницу (график пустой)
- Нажимает кнопку Start
- Сервер генерирует случайную матрицу и запускает метод solve\_qubo из sdk-mock (см. пример в файле test.py)
- В процессе решения sdk пердиодически выдает найденное значение энергии через callback-функцию (см. _energy_в файле test.py)
- Полученные значения энергии отображаются на стороне клиента в реальном времени на графике с отметкой о времени

1.4. Вычислительный модуль предоставляется в виде отдельного файла (см. sdk-mock.zip)

1.5. Предпочтительный стек технологий – python + django + react.

1.6. Авторизацию, шифрование и прочие вспомогательные функции реализовывать не требуется.

**2. Конечный результат**

2.1. Ссылка на приватный gitlab репозитарий или файл с исходником

2.2. ip-адрес запущенного сервера

## Решение:

![preview](/doc/Quantum_web_test.gif)

## How to run it locally

```bash
# Build and run docker containers: Redis & Centry & the django app
make run
```

**Run backend**

```bash
# Build and run docker containers: Redis & Centry & the django app
make bk-start
```

Available at `http://localhost:8000`.

**Run frontend**

```bash
make ft-run # Serve the web app
```

Available at `http://localhost:8080`.

## Extras

**Redux Devtools**

You can use the [Redux Devtools](https://github.com/gaearon/redux-devtools) on this app.

## License
This piece of code is licensed under [MIT License](/LICENSE).

