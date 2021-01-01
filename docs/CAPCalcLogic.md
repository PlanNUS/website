**CAP Calculator Main Logic**

| Initial Type | New Type    | Update MxP         | Total MC Cleared Internal | Update CAP |
| ------------ | ----------- | ------------------ | ------------------------- | ---------- |
| Not Cleared  | Not Cleared | -                  | -                         | -          |
| Not Cleared  | SU          | -                  | -                         | -          |
| Not Cleared  | Normal      | Add MxP            | Add MC                    | Divide     |
| Normal       | Not Cleared | Minus MxP          | Minus MC                  | Divide     |
| Normal       | SU          | Minus MxP          | Minus MC                  | Divide     |
| Normal       | Normal      | Minus then Add MxP | -                         | Divide     |
| SU           | Not Cleared | -                  | -                         | -          |
| SU           | SU          | -                  | -                         | -          |
| SU           | Normal      | Add MxP            | Add MC                    | Divide     |

| Cleared | Cleared | Total MC Cleared External |
| ------- | ------- | ------------------------- |
| True    | True    | Maintain                  |
| True    | False   | Minus MC                  |
| False   | True    | Add MC                    |
| False   | False   | Maintain                  |

- Special condition: Treat 0 MCs and 0 Grade Point as SU. 

