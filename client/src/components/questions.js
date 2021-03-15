import React, { Component } from 'react';
import './questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      fonds: [],
      questions: [
        "Вопрос 1. Является ли для вас важным помогать благотворительным организациям конкретного региона?",
        "Вопрос 2. Если представить, что вам необходимо сразиться с чудищем, то какая философия воина вам ближе?",
        "Вопрос 3. Что из нижеследующего наиболее актуально для вас на данный период жизни?",
        "Вопрос 4. Как вы считаете, что из нижеперечисленного наиболее важно для благополучия общества?",
        "Вопрос 5. Какое направление помощи для вас наиболее приоритетно?",
        "Вопрос 6. Вы выбрали помощь конкретным людям и социальным группам как приоритетную для вас. При этом существуют социальные группы, которым помогают многие организации и наоборот, группы, которым помогает очень ограниченное количество организаций. Кому бы вы предпочли помочь?"
      ],
      options: [
        [" Да, для меня важно помогать организациям своего региона",
          " Нет, мне более важна тематика, которой занимается организация"],
        [" Пришел, увидел, победил. Потому что для меня важно видеть результат здесь и сейчас",
          "  Я терпеливый человек, могу и подождать. Как сказал Лао Дзы: сядь на берегу реки, и вскоре ты увидишь, как мимо тебя проплывает труп твоего врага."],
        [" Безопасная среда", " Хорошее здоровье", " Достойный уровень жизни", " Правовое государство", " Хорошие отношения с людьми",
          " Саморазвитие", " Научный прогресс", " Забота о природе", " Почитание традиций"],
        [" Безопасная среда", " Хорошее здоровье", " Достойный уровень жизни", " Правовое государство", " Хорошие отношения с людьми",
          " Саморазвитие", " Научный прогресс", " Забота о природе", " Почитание традиций"],
        [" Помощь конкретным людям и социальным группам", " Развитие общества в целом", " Помощь животным", " Защита экологии"],
        [" “Популярные” группы благополучателей", " “Непопулярные” группы благополучателей"],
      ],
      counter: 0,
      lastButton: false,
      showFirstPage: true,
      choises: []
    };
    this.handleClickNextButton = this.handleClickNextButton.bind(this);
    this.handleClickLastButton = this.handleClickLastButton.bind(this);
    this.skipQuestion = this.skipQuestion.bind(this);
  }

  findSelection(field) {
    const values = document.getElementsByName(field);
    for (var i = 0; i < values.length; i++) {
      if (values[i].checked) {
        // eslint-disable-next-line
        return parseInt(values[i].value) + 1;
      }
    }
    return 0;
  }

  handleClickNextButton() {
    this.setState(({ choises, counter }) => {
      const copyChoises = choises;
      copyChoises.push(this.findSelection("dzen"));
      counter++;
      return {
        choises: copyChoises,
        counter
      }
    });
  }

  handleClickLastButton() {
    this.setState(({ choises, lastButton }) => {
      const copyChoises = choises;
      copyChoises.push(this.findSelection("dzen"));
      lastButton = true;
      return {
        choises: copyChoises,
        lastButton
      }
    });
  }

  skipQuestion() {
    this.setState(({ choises, counter }) => {
      const copyChoises = choises;
      copyChoises.push(-1);
      counter++;
      return {
        choises: copyChoises,
        counter
      }
    });
  }

  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        console.log('data fetched:', data);
        this.setState({ fonds: data });
      });
  }

  doShowFirstPage() {
    return (
      <div className="all-wrapper">
        <div className="qu-answ-wrapper">
          <p className="qu-intro">Как определиться кому помогать?</p>
          <p className="answ-intro">Выбрать кому помогать может быть сложно, ведь существует много различных проблем, которые мы стремимся решить, много вариантов получателей помощи и много организаций. Мы сделали этот тест, чтобы помочь вам в этом.</p>
          <p className="answ-intro">Если вопрос покажется вам слишком сложным, вы всегда можете нажать “пропустить”. После завершения теста мы предложим вам несколько организаций исходя из ваших ответов. Все они проверены и смогут эффективно распоряжаться вашими средствами.</p>
          <div className="buttons-wrapper">
            <button className="btn main-button" onClick={() => this.setState({ showFirstPage: false })}>
              Пройти тест
            </button>
            <button className="btn side-button" onClick={() => this.setState({ lastButton: true, showFirstPage: false })}>
              Мне повезёт!
            </button>
          </div>
        </div>
      </div>
    )
  }

  showResults() {

    return (
      <div>
        <p className="qu-intro-result">Результат теста</p>
        <div className="all-card-wrapper">
          <div className="card-wrapper">
            <img src={this.state.fonds[0].logo} className="logo-help" alt="logo"></img>
            <p className="org-title" >{this.state.fonds[0].short_name_visible}</p>
            <p className="org-city">{this.state.fonds[0].city}</p>
          </div>
          <div className="card-wrapper">
            <img src={this.state.fonds[1].logo} className="logo-help" alt="logo"></img>
            <p className="org-title">{this.state.fonds[1].short_name_visible}</p>
            <p className="org-city">{this.state.fonds[1].city}</p>
          </div>
          <div className="card-wrapper">
            <img src={this.state.fonds[2].logo} className="logo-help" alt="logo"></img>
            <p className="org-title">{this.state.fonds[2].short_name_visible}</p>
            <p className="org-city">{this.state.fonds[2].city}</p>
          </div>
        </div>
      </div>
    )
  }


  render() {
    const showLastButton = (this.state.counter === this.state.options.length - 1);
    return (
      this.state.showFirstPage ?
        this.doShowFirstPage()
        :
        <div className="all-wrapper">
          {
            this.state.lastButton ?
              <div>
                {this.showResults()}
              </div> :
              <div className="qu-answ-wrapper">
                <p className="qu">{this.state.questions[this.state.counter]}</p>
                {this.state.options[this.state.counter].map((question, id) =>
                  <p className="answ">
                    <label htmlFor="dzen"></label>
                    <input name="dzen" type="radio" value={id} />
                    {question}</p>
                )}

                <div className="buttons-wrapper">
                  {
                    showLastButton ?
                      <button className="btn main-button" onClick={this.handleClickLastButton}>
                        К результатам!
                    </button> :
                      <div className="buttons-wrapper">
                        <button className="btn main-button" onClick={this.handleClickNextButton}>
                          Следующий вопрос {this.state.counter + 1} / {this.state.options.length}
                        </button>
                        <button className="btn side-button" onClick={this.skipQuestion}>
                          Пропустить вопрос
                        </button>
                      </div>
                  }
                </div>
              </div>

          }
        </div>
    );
  }
}

export default Questions;
