---
layout: post
title: "Comparaison entre TypeScript et JavaScript"
date: 2025-05-01
category: Développement
excerpt: "Découvrez les différences clés entre TypeScript et JavaScript."
---

# Présentation

JavaScript et TypeScript sont deux langages très utilisés dans le développement web. JavaScript est le langage de base, tandis que TypeScript est une extension de JavaScript qui ajoute des fonctionnalités supplémentaires. Dans cet article, nous allons explorer les différences importantes entre ces deux langages de manière simple et claire.

<br>

## Qu'est-ce que JavaScript ?

JavaScript est un langage de programmation utilisé principalement pour rendre les pages web interactives. Il permet d'ajouter des fonctionnalités dynamiques aux sites web, comme des animations, des formulaires interactifs, et bien plus encore. JavaScript est exécuté directement dans le navigateur, ce qui le rend très rapide et efficace pour les applications web.

<br>

## Qu'est-ce que TypeScript ?

TypeScript est un sur-ensemble de JavaScript développé par Microsoft. Il ajoute des types statiques à JavaScript, ce qui signifie que vous pouvez définir des types pour vos variables, fonctions, et objets. Cela permet de détecter des erreurs avant même d'exécuter le code, ce qui rend le développement plus sûr et plus fiable.

<br>

# Différences Clés entre TypeScript et JavaScript
<br>

## 1. Typage Statique vs Typage Dynamique

* **JavaScript** : Utilise un typage dynamique. Cela signifie que vous n'avez pas besoin de définir le type d'une variable à l'avance. Le type est déterminé lors de l'exécution du code.

```javascript
let message = "Hello, World!";
message = 42; // C'est possible en JavaScript

// Autre exemple
let user = "John";
user = { name: "John", age: 30 }; // Aucune erreur en JavaScript
console.log(user.name); // "John"
```

* **TypeScript** : Utilise un typage statique. Vous devez définir le type d'une variable lors de sa déclaration. Cela permet de détecter les erreurs de type avant l'exécution.

```typescript
let message: string = "Hello, World!";
message = 42; // Erreur : Type 'number' n'est pas attribuable à type 'string'

// Autre exemple
let user: string = "John";
user = { name: "John", age: 30 }; // Erreur : Type '{ name: string; age: number; }' n'est pas attribuable à type 'string'
```
<br>

## 2. Détection des Erreurs

* **JavaScript** : Les erreurs sont souvent détectées à l'exécution, ce qui peut rendre le débogage plus difficile.

```javascript
// Exemple JavaScript - Erreur détectée seulement à l'exécution
function calculateArea(width, height) {
  return width * heigth; // Faute de frappe "heigth" au lieu de "height"
}

console.log(calculateArea(5, 10)); // Génère une erreur à l'exécution: "heigth is not defined"
```

* **TypeScript** : Les erreurs peuvent être détectées à la compilation, grâce au typage statique. Cela permet de corriger les erreurs avant même de lancer l'application.

```typescript
// Exemple TypeScript - Erreur détectée à la compilation
function calculateArea(width: number, height: number): number {
  return width * heigth; // Erreur de compilation: "Cannot find name 'heigth'"
}

console.log(calculateArea(5, 10));
```
<br>

## 3. Orienté Objet

* **JavaScript** : Bien que JavaScript supporte la programmation orientée objet, il n'a pas de classes et d'héritage natifs (avant ES6). Vous pouvez utiliser des fonctions constructrices et des prototypes pour créer des objets.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log("Hello, " + this.name);
};

let person = new Person("Alice");
person.greet(); // Affiche "Hello, Alice"

// Exemple d'héritage en JavaScript
function Employee(name, position) {
  Person.call(this, name);
  this.position = position;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.introduce = function() {
  console.log(`Je m'appelle ${this.name} et je suis ${this.position}`);
};

let employee = new Employee("Bob", "développeur");
employee.greet(); // "Hello, Bob"
employee.introduce(); // "Je m'appelle Bob et je suis développeur"
```

* **TypeScript** : TypeScript supporte pleinement les classes et l'héritage, ce qui rend la programmation orientée objet plus intuitive et plus propre.

```typescript
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log("Hello, " + this.name);
  }
}

let person = new Person("Alice");
person.greet(); // Affiche "Hello, Alice"

// Exemple d'héritage en TypeScript
class Employee extends Person {
  position: string;

  constructor(name: string, position: string) {
    super(name);
    this.position = position;
  }

  introduce() {
    console.log(`Je m'appelle ${this.name} et je suis ${this.position}`);
  }
}

let employee = new Employee("Bob", "développeur");
employee.greet(); // "Hello, Bob"
employee.introduce(); // "Je m'appelle Bob et je suis développeur"
```
<br>

## 4. Interfaces

* **JavaScript** : JavaScript n'a pas de concept d'interfaces. Vous pouvez utiliser des objets pour définir des structures, mais cela n'est pas aussi strict que les interfaces.

```javascript
// JavaScript - Utilisation d'objets comme structure
function greet(person) {
  console.log("Hello, " + person.name);
}

let person = { name: "Alice", age: 30 };
greet(person); // Affiche "Hello, Alice"

// Mais rien n'empêche de passer un objet incompatible
greet({ firstName: "Bob" }); // Affiche "Hello, undefined" - Aucune erreur de détectée
```

* **TypeScript** : TypeScript permet de définir des interfaces, ce qui vous permet de définir des contrats pour vos objets. Cela rend le code plus prévisible et plus facile à comprendre.

```typescript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  console.log("Hello, " + person.name);
}

let person: Person = { name: "Alice", age: 30 };
greet(person); // Affiche "Hello, Alice"

// Erreur de compilation - Propriété 'name' manquante
greet({ firstName: "Bob" }); // Erreur: Argument of type '{ firstName: string; }' is not assignable to parameter of type 'Person'.
```
<br>

## 5. Modules

* **JavaScript** : JavaScript supporte les modules (à partir de ES6), mais leur utilisation peut être un peu complexe.

```javascript
// person.js
export function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log("Hello, " + this.name);
};

// main.js
import { Person } from './person.js';

let person = new Person("Alice");
person.greet(); // Affiche "Hello, Alice"
```

* **TypeScript** : TypeScript supporte nativement les modules, ce qui rend l'organisation du code plus facile et plus propre.

```typescript
// person.ts
export class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log("Hello, " + this.name);
  }
}

// main.ts
import { Person } from './person';

let person = new Person("Alice");
person.greet(); // Affiche "Hello, Alice"
```

<br>

# Conclusion

TypeScript et JavaScript sont tous deux des langages puissants pour le développement web. JavaScript est plus flexible et plus rapide à apprendre, tandis que TypeScript offre des fonctionnalités supplémentaires qui rendent le développement plus sûr et plus fiable. Si vous travaillez sur un projet complexe ou en équipe, TypeScript peut être un excellent choix grâce à ses types statiques et à ses fonctionnalités avancées.

Si vous êtes un développeur JavaScript, envisagez d'explorer TypeScript pour vos prochains projets. Vous pourriez être surpris par les gains de productivité et la qualité du code que vous obtiendrez.