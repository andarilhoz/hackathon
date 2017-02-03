import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  styleUrls: ['./assunto.component.css']
})
export class AssuntoComponent implements OnInit {

  dicas: Array<string> = [
"Troque as lâmpadas incandescentes por fluorescentes. Estas duram mais e utilizam menor quantidade de energia","Não deixe a luz acesa em cômodos desnecessariamente","Pinte as paredes internas e os tetos da casa com cores claras. Elas refletem eespalham a luz para todo o ambiente","Aproveite ao máximo a luz do dia deixando cortinas e portas abertas. Em casode mesas de trabalho e de leitura, coloque-as próximas às janelas","Deixe os globos e lustres transparentes sempre limpos para aproveitar aomáximo a potência das lâmpadas","No caso dos aparelhos de ar-condicionado, mantenha os filtros sempre bemhigienizados","Use o termostato do ar-condicionado para regular a temperatura e evitar asobrecarga do aparelhoMáquina de lavar roupa e ferro de passar consomem bastante energia. Portanto,tente usá-los quando houver bastante roupa acumulada para realizar o trabalhode uma única vez","Em dias secos, ao invés de usar umidificadores eletrônicos, coloque um panoúmido pendurado no recinto e uma bacia com água","Evite deixar aparelhos eletrônicos em stand-by. Apesar de desligados, essemodo pode representar um gasto mensal de até 12%","Evite colocar o fogão e a geladeira próximos um do outro. Eles podem interferirno consumo de energia","Mantenha a borracha de vedação da geladeira sempre em bom estado","Regule a temperatura da geladeira no inverno, ajustando o termostato para evitardesperdício de consumo, e não forre as prateleiras para não exigir esforçoredobrado do eletrodoméstico","Quando viajar, desligue a chave geral da casa para não gastar energia com coisasdesnecessárias."]

  dicaAtual = this.dicas[Math.floor(Math.random() * this.dicas.length)]

  constructor(private router: Router) { }
  
  ngOnInit() {


  }





}
