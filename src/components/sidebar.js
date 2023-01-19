import React, { Component } from 'react';
import '../App.css';
import ContentSection from './content-section';


class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  render() {
  const { currentlyEditing } = this.state;

    return (
      <div className="sidebar">
        <ContentSection 
          sectionTitle="Personal Summary" 
          defaultValue="<p>I am a driven and enthusiastic pooch with 4 years of experiencing in delighting humans across Carnoustie.&nbsp;</p><p>&nbsp;</p><p>I'm very curious with an excellent sense of smell, and delight in causing mischief. I have a proven track record in delivering smiles.</p><p>&nbsp;</p><p>I'm passionate about creating happiness in the world and am seeking further opportunities to play, love and bark.</p><p>&nbsp;</p><p>&nbsp;</p>"
        />
        <ContentSection 
          sectionTitle="Skills" 
          defaultValue="<ul><li>Sniffing</li><li>Running in the park</li><li>Snoozing until my dog walker comes</li><li>Hugging</li><li>Eating biscuits</li><li>Making friends</li></ul>" 
        />
      </div>
    )
  }
}

export default Sidebar;