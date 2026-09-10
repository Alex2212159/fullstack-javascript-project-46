### Hexlet tests and linter status:
[![Actions Status](https://github.com/Alex2212159/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Alex2212159/fullstack-javascript-project-46/actions)

[![projectjs](https://github.com/Alex2212159/fullstack-javascript-project-46/actions/workflows/projectjs.yml/badge.svg)](https://github.com/Alex2212159/fullstack-javascript-project-46/actions/workflows/projectjs.yml)

[![asciicast](https://asciinema.org/a/MLu7D0L3a604pUnh.svg)](https://asciinema.org/a/MLu7D0L3a604pUnh)

[![asciicast](https://asciinema.org/a/wngfzyDshIBXipaa.svg)](https://asciinema.org/a/wngfzyDshIBXipaa)

[![asciicast](https://asciinema.org/a/lndmNmKuuWnEN4cR.svg)](https://asciinema.org/a/lndmNmKuuWnEN4cR)

# «Вычислитель отличий»

— программа, которая определяет разницу между двумя структурами данных. Это популярная задача, для которой существуют онлайн-сервисы вроде jsondiff; похожий механизм используется при выводе тестов и при отслеживании изменений в конфигурационных файлах.

# Installation

```bash
make install
```

## Help information

Получение справочной информации, которая генерируется автоматически на основе данных известных о вашей программе.

```bash
gendiff -h
```

## Functional option 

Получение разницы для вложенных структур форматов json и yaml. 

Вывод дифа в формате stylish (с отступами и спецсимволами). Образец:

```bash
gendiff -f stylish __fixtures__/file1.yml  __fixtures__/file2.yml 
```
Без указания опции --format/-f, форматер stylish(вывод разницы с отступами и спецсимволами) используется по умолчанию.

```bash
gendiff __fixtures__/file1.yml  __fixtures__/file2.yml 
```

Вывод дифа в формате plain (в виде текстовых описаний изменений). Образец:

```bash
gendiff -f plain __fixtures__/file1.json __fixtures__/file2.json 
```