// import { Component } from '@angular/core';
// import { Movie } from '../../models/movie';
// import { MovieService } from '../../services/movie.service';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-create-movie',
//   templateUrl: './create-movie.component.html',
//   styleUrls: ['./create-movie.component.scss'],
//   standalone: true,
//   imports: [MatFormFieldModule, MatInputModule, FormsModule],
// })
// export class CreateMovieComponent {
//   movie: Movie = {
//     id: 0,
//     title: '',
//     genre: [],
//     releaseYear: 0,
//     imageUrl: ''
//   };

//   constructor(private movieService: MovieService) {}

//   createMovie() {
//     this.movieService.createMovie(this.movie)
//       .subscribe(
//         (createdMovie) => {
//           console.log('Filme criado com sucesso:', createdMovie);
//           // Limpar o formulário ou redirecionar para outra página
//         },
//         (error) => {
//           console.error('Erro ao criar filme:', error);
//         }
//       );
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
})
export class CreateMovieComponent {
  movie: Movie = {
    id: 0,
    title: '',
    genre: [],
    releaseYear: 0,
    imageUrl: ''
  };

  constructor(
    private movieService: MovieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  createMovie() {
    if (!this.movie.title || !this.movie.releaseYear || !this.movie.imageUrl) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
      return;
    }

    // Verifica se genre é uma string e a converte para array
    if (typeof this.movie.genre === 'string') {
      this.movie.genre = this.movie.genre.split(',').map(genre => genre.trim());
    }

    // Verifica se genre é um array e não está vazio
    if (!Array.isArray(this.movie.genre) || this.movie.genre.length === 0) {
      this.snackBar.open('Por favor, adicione pelo menos um gênero.', 'Fechar', { duration: 3000 });
      return;
    }

    this.movieService.createMovie(this.movie)
      .subscribe(
        (createdMovie) => {
          this.snackBar.open('Filme criado com sucesso!', 'Fechar', { duration: 3000 });
          this.movie = { id: 0, title: '', genre: [], releaseYear: 0, imageUrl: '' }; // Limpar formulário
          this.router.navigate(['/']); // Redirecionar para a página inicial
        },
        (error) => {
          this.snackBar.open('Erro ao criar filme. Tente novamente.', 'Fechar', { duration: 3000 });
          console.error('Erro ao criar filme:', error);
        }
      );
  }
}
