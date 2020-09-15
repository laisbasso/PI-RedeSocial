import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-postagem-tema',
  templateUrl: './postagem-tema.component.html',
  styleUrls: ['./postagem-tema.component.css'],
})
export class PostagemTemaComponent implements OnInit {
  idTema: number;
  tema: Tema;
  listaTemas: Tema[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    this.idTema = this.route.snapshot.params['id'];
    this.findByIdTema();
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
      this.findByNomeTema();
    });
  }

  findByNomeTema() {
    this.temaService
      .getByNomeTema(this.tema.descricao)
      .subscribe((resp: Tema[]) => {
        this.listaTemas = resp;

        console.log(JSON.stringify(this.listaTemas));
      });
  }

  voltar() {
    this.router.navigate(['/feed']);
  }
}
