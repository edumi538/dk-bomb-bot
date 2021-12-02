Este sistema não é um bot e sim um macro que utiliza de ação externa simulando ações humanas.

Olá galera, eu estava desenvolvendo este macro para uso próprio e tive exito em sua finalização na versão 1.0. Mesmo possuindo algumas falhas era possível utiliza-lo para otimizar o tempo de farm. Como não apoio a visão dos desenvolvedores do jogo e acredito que macro não influencia na moeda como eles acreditam, decidi abrir o código pra quem quiser adicionar novos recursos a ele e mesmo tentar quebrar o CAPTCHA adicionado atualmente. Qualquer um esta livre para forkiar e criar pull requests para ele.

**COMO FUNCIONA**

1 . O Macro foi construida na linguagem javascript fundido ao framework nodejs e Electron, pois é uma area q entendo bastante e acredito q se adapte bem com um jogo de navegador... alem de ser mais dificil de ser reconhecido como um sistema terceiro.

2 . O Macro utiliza de uma biblioteca chamada robotJs, do qual ja há implementado vários recursos que auxiliam bastante no desenvolvimento do macro. A documentação se encontra em: http://robotjs.io/

3. O Macro ja consta com sistema para gerar um executável tornando mais simples a sua distribuição e concedo aqui todo direito a quem quiser distruibuí-lo lembrando apenas de dar os devidos créditos a quem o iniciou. Não desejo lucro vindo dele apenas q funcione e que permita q possamos disfrutar da nossa vida social kkkk e não ter q parar de dormir ou desistir do game.

4. Qualquer dúvida podem me acionar, estarei sempre aqui.

5. Para instala-lo vc deve ter os seguintes recursos:
  * NodeJs
  * Electron
  * Robotjs
  * E fazer um rebuild para usar o electron e o robotjs unidos / http://robotjs.io/docs/electron

6. O Código principal da aplicação está em electron/main.js
