import React, { Component } from 'react';
import '../App.css';
import { jsPDF } from "jspdf";

class GeneratePDFButton extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  generatePDF = () => {
    console.log('hello')

    const doc = new jsPDF();
    const app = document.getElementById('app');
  
    doc.html(app, {
      width: 208, // 216 = letter paper width in mm, 208 = less the 8mm margin
      windowWidth: 786,  // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
      html2canvas: {
        logging: false,
        windowWidth: 786, // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
        useCORS: true
      },
      callback: function (doc) {
        doc.save();
      }
    
    })
  }

  render() {
    return (
      <button type="button" onClick={() => this.generatePDF()}>Generate PDF</button>
    )
  }
}

export default GeneratePDFButton;