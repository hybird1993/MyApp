import {Component, OnInit} from '@angular/core';

declare const vis;

@Component({
  selector: 'app-visjs',
  templateUrl: './visjs.component.html',
  styleUrls: ['./visjs.component.scss']
})
export class VisjsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const nodes = [
      {id: 0, label: '0:Input_op', x: 400, y: 0, color: {border: 'red'}},
      {id: 1, label: '1:Activation_op', x: 400, y: 100},
      {id: 2, label: '2:Lstm_op', x: 200, y: 100},
      {id: 5, label: '5:Concat_op', x: 300, y: 200},
      {id: 3, label: '3:Lstm_op', x: 300, y: 300},
      {id: 6, label: '6:Concat_op', x: 400, y: 400},
      {id: 4, label: '4:Sparse_Softmax_Cross_Entropy', x: 450, y: 500, color: {border: 'blue'}},
      {id: 7, label: 'ID:25<>HowCome:keptbest', x: 400, y: 550, color: {border: 'white'}, heightConstraint: { minimum: 20 }},
      {id: 8, label: 'loss = -0.8911764705882353', x: 400, y: 590, color: {border: 'white'}, heightConstraint: 20 },
    ];

    // create an array with edges
    const edges = [
      {from: 0, to: 1, },
      {from: 0, to: 2, },
      {
        from: 0, to: 6,
        smooth: {
          type: 'diagonalCross',
          roundness: 0.6
        }
      },
      {from: 2, to: 5, },
      {from: 1, to: 5, },
      {from: 5, to: 3, },
      {from: 1, to: 6, },
      {from: 6, to: 4, },
    ];

    // create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes: nodes,
      edges: edges
    };
    const options = {
      interaction: {
        dragNodes: false, // 是否能拖动节点
        dragView: true, // 是否能拖动画布
        zoomView: true,   //  是否能缩放画布
        selectable: false  // 是否可以点击选择
      },
      edges: {
        shadow: false, // 连接线阴影配置
        smooth: true, // 是否显示方向箭头
        // arrows: {to : true } // 箭头指向from节点
        color: {color: 'black'}
      },
      nodes: {
        color: {background: '#fff', border: 'black'},
        margin: 10,
        font: {
          size: 20
        },
        widthConstraint: { minimum: 100 },
        heightConstraint: { minimum: 28 }
      },
      physics: {
        enabled: false
      },
    };
    const network = new vis.Network(container, data, options);
  }

}
