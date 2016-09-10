import React, {PropTypes} from 'react';
import {connect} from 'react-redux'

const StartPage = ({items,selectedQuest})=> (
    <div>
        <div>
            <h1>Team {selectedQuest}</h1>
            <div className="lead">Dere får tre oppgaver som dere må løse.
                Dere kan se oppgavene ved å touche tallene over.
                Skriv svarene på oppgavesidene, dere trenger de senere</div>
            <div className="lead">Når dere har funnet de tre svarene, skal dere tilbake til kjelleren til huset til Isak.
            Dere skal ned i katakombene for å finne tre magiske kort. Kortene må ha samme symbol som svarene i oppgavene.</div>
        </div>
    </div>);

const mapDispatchToProps = (dispatch) => {
    return {}
};

const mapStateToProps = (state)=> {
    return {items: state.quest.tasks,selectedQuest:state.quest.selectedQuest}
};

const StartPageContainer = connect(mapStateToProps,mapDispatchToProps)(StartPage);

export default StartPageContainer