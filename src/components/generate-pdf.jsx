/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import '../App.css';
import { jsPDF } from 'jspdf';
import { Secular, Montserrat } from '../assets/fonts';

class GeneratePDFButton extends Component {
  // hacky approach to manually remove the margin between pages when generating PDF
  static toggleMargin = async () => {
    const pages = document.querySelectorAll('.page');

    pages.forEach((page) => {
      page.classList.toggle('remove-margin');
    });
  };

  static sortSVG = async () => {
    const canvas = document.querySelector('.to-print');
    const screenWidth = parseFloat(window.getComputedStyle(canvas).width);

    const problematic = document.querySelectorAll('.svg-inline--fa');
    problematic.forEach((el) => {
      html2canvas(
        el,
        {
          scale: 2480 / screenWidth, // 2480px - size for A4 paper, 300 dpi
        },
      )
        .then(() => {
          const img = canvas.toDataURL('image/jpeg');
          el.innerHTML = `<img src="${img}" class="img">`;
        });
    });
  };

  static generatePDF = async () => {
    const doc = new jsPDF();
    doc.addFileToVFS('SecularOne-Regular.ttf', Secular);
    doc.addFileToVFS('Montserrat-Regular.ttf', Montserrat);
    doc.addFont('SecularOne-Regular.ttf', 'Secular One', 'normal');
    doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal');
    GeneratePDFButton.toggleMargin();
    const app = document.getElementById('app');

    await doc.html(app, {
      width: 208, // 216 = letter paper width in mm, 208 = less the 8mm margin
      windowWidth: 786, // 816 = letter paper pixel width at 96dpi(web), 786 = less the 30px margin
      html2canvas: {
        logging: false,
        windowWidth: 786, // 816 = letter paper px width at 96dpi(web), 786 = less the 30px margin
        useCORS: true,
      },
      callback(file) {
        file.save('cv.pdf');
      },

    });
    GeneratePDFButton.toggleMargin();
  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <button type="button" onClick={() => GeneratePDFButton.generatePDF()}>Generate PDF</button>
    );
  }
}

export default GeneratePDFButton;
