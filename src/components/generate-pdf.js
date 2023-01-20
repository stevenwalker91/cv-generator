import React, { Component } from 'react';
import '../App.css';
import { jsPDF } from "jspdf";
import { Secular, Montserrat } from '../assets/fonts';

class GeneratePDFButton extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  //hacky approach to manually remove the margin between pages when generating PDF
  toggleMargin = async () => {
    console.log('running')
    const pages = document.querySelectorAll('.page');

    for (const page of pages) {
      page.classList.toggle('remove-margin')
    }
  }

  generatePDF = async () => {
    const doc = new jsPDF();
    doc.addFileToVFS('SecularOne-Regular.ttf', Secular)
    doc.addFileToVFS('Montserrat-Regular.ttf', Montserrat)
    doc.addFont('SecularOne-Regular.ttf', 'Secular One', 'normal')
    doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal')
    this.toggleMargin();
    const app = document.getElementById('app');

    await doc.html(app, {
      width: 208, // 216 = letter paper width in mm, 208 = less the 8mm margin
      windowWidth: 786,  // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
      html2canvas: {
        logging: false,
        windowWidth: 786, // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
        useCORS: true
      },
      callback: function (doc) {
        doc.save('cv.pdf');
      }
    
    })
    this.toggleMargin();
    
  }

  render() {
    return (
      <button type="button" onClick={() => this.generatePDF()}>Generate PDF</button>
    )
  }
}

export default GeneratePDFButton;