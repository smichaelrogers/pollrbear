@password = BCrypt::Password.create('asdfasdf');
@users = []
@polls = []
@answers = []
@responses = []
@polls = []
u0 = User.create!(first_name: 'Guest', last_name: 'User', email: 'guest@guest.com', password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u1 = User.create!(first_name: 'Tom', last_name: 'Hanks', email: 'wilson@tom.hanks', password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u2 = User.create!(first_name: 'Alejandra', last_name: 'Renfro', email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u3 = User.create!(first_name: 'Tashya', last_name: 'Sparks', email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u4 = User.create!(first_name: 'Peter', last_name: 'Fowler', email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u5 = User.create!(first_name: 'Vicky', last_name: 'Warren', email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u6 = User.create!(first_name: 'Sheila', last_name: 'Page', email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u7 = User.create!(first_name: 'Carson', last_name: 'Norton', email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u8 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u9 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u10 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u11 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u12 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u13 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u14 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u15 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u16 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u17 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u18 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u19 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u20 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u21 = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name , email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
@users = [u0,u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12,u13,u14,u15,u16,u17,u18,u19,u20,u21]
idx = 0

@questions = ["{
    \"question\":\"What year did cigarette commercials stop appearing on TV?\",
    \"answers\":[
      \"1971\",
      \"1966\",
      \"1977\",
      \"1980\"
    ]
  }",
  "{
    \"question\":\"What city has served twice as host of the modern Winter Olympic Games?\",
    \"answers\":[
      \"Innsbruck, Austria\",
      \"Lake Placid, New York\",
      \"St. Moritz, Switzerland\"
    ]
  }",
  "{
    \"question\":\"In a quarter-mile race, which animal can be expected to win?\",
    \"answers\":[
      \"Lion\",
      \"pronghorn antelope\",
      \"giraffe\",
      \"quarter horse\"
    ]
  }",
  "{
    \"question\":\"In the 1972 chess tournament held in Reykjavik, Iceland, who did Bobby Fischer defeat?\",
    \"answers\":[
      \"Tigran Petrosian\",
      \"Anatoly Karpov\",
      \"Gary Kasparov\",
      \"Boris Spassky\"
    ]
  }",
  "{
    \"question\":\"What are The Footballer, The Card Party, Wedding Breakfast at the Eiffel Tower, and the Filling Station all titles of?\",
    \"answers\":[
      \"French paintings\",
      \"op record albums\",
      \"short stories by O'Henry\",
      \"ballets\"
    ]
  }",
  "{
    \"question\":\"Whose real name was Thomas Lanier Williams?\",
    \"answers\":[
      \"Robin Williams\",
      \"Ted Williams\",
      \"Andy Williams\",
      \"Tennessee Williams\"
    ]
  }",
  "{
    \"question\":\"Which golfer won the British Open and the Masters two times during the period from 1987 to 1990?\",
    \"answers\":[
      \"Scott Hoch\",
      \"Nick Faldo\",
      \"Curtis Strange\",
      \"Greg Norman\"
    ]
  }",
  "{
    \"question\":\"In 1988, 18 to 24-year-olds from which of the following countries had the worst average score in an international  geographic  test given by the National Geographic Society and the Gallup Organization?\",
    \"answers\":[
      \"Mexico\",
      \"Norway\",
      \"France\",
      \"United States\"
    ]
  }",
  "{
    \"question\":\"What is the traditional gift for a 40th wedding anniversary?\",
    \"answers\":[
      \"emerald\",
      \"diamond\",
      \"ruby\",
      \"sapphire\"
    ]
  }",
  "{
    \"question\":\"What are Kirin, Sapporo, Asahi, and Suntory?\",
    \"answers\":[
      \"four Japanese car makers\",
      \"four dangerous creatures of mythology\",
      \"four styles of Japanese art\",
      \"four brands of Japanese beer\"
    ]
  }",
  "{
    \"question\":\"A group of lions is called a 'pride'. What word would be used to describe a group of crows?\",
    \"answers\":[
      \"a colony\",
      \"a barn\",
      \"a murder\",
      \"a flock\"
    ]
  }",
  "{
    \"question\":\"What is a fandango?\",
    \"answers\":[
      \"a dance\",
      \"a food\",
      \"a hat\",
      \"a grass skirt\"
    ]
  }",
  "{
    \"question\":\"A golfer is permitted to use an assortment of no more than how many clubs in a regulation round?\",
    \"answers\":[
      \"14\",
      \"12\",
      \"10\",
      \"8\"
    ]
  }",
  "{
    \"question\":\"In the year 1900, which of the following did not take place?\",
    \"answers\":[
      \"the first Barnum & Bailey's circus\",
      \"the first College Board Scholastic Aptitude tests\",
      \"the first launching of a rigid airship by Ferdinand von Zeppelin\",
      \"the first Davis Cup tennis match between the U.S. and Great Britain\"
    ]
  }",
  "{
    \"question\":\"Which member of the Ivy League was founded under the name King's College?\",
    \"answers\":[
      \"Brown\",
      \"Columbia\",
      \"Cornell\",
      \"Dartmouth\"
    ]
  }",
  "{
    \"question\":\"What item in some states is required to show a triangle, a number, and the letters 'PETE,' 'HDPE,' 'LDPE,' 'PP,'  or 'PS'?\",
    \"answers\":[
      \"glass jars\",
      \"metal cans\",
      \"plastic bottles\",
      \"\"
    ]
  }",
  "{
    \"question\":\"In what field are the NoRMA awards give for excellence?\",
    \"answers\":[
      \"Broadway plays\",
      \"newspaper advertising\",
      \"TV reporting\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Malcolm Forbes held a 70th birthday party for 600 guests in 1989.  Where did he hold it?\",
    \"answers\":[
      \"Calcutta, India\",
      \"Kuala Lumpur, Malaysia\",
      \"Tangier, Morocco\",
      \"\"
    ]
  }",
  "{
    \"question\":\"The Peace Corps had its greatest number of volunteers in which year?\",
    \"answers\":[
      \"1966\",
      \"1976\",
      \"1986\"
    ]
  }",
  "{
    \"question\":\"The Caspian Sea is considered to be the biggest lake on the planet. What is the next largest lake?\",
    \"answers\":[
      \"Great Slave Lake\",
      \"Lake Superior\",
      \"Lake Victoria\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Three islands that can all be found near a major tourist attraction are Goat Island, Luna Island, and Three Sisters Island. What is the tourist attraction?\",
    \"answers\":[
      \"Disney World\",
      \"Niagara Falls\",
      \"the Statue of Liberty\",
      \"\"
    ]
  }",
  "{
    \"question\":\"In May 1990, when van Gogh's painting Portrait of Dr. Gachet was sold, it set a record price for an auctioned work of art.  How much was the winning bid?\",
    \"answers\":[
      \"$825,000\",
      \"$8,250,000\",
      \"$82.5 million\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What are akitas, briards, and samoyeds?\",
    \"answers\":[
      \"cats\",
      \"dogs\",
      \"flowers\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What are 'cinderella's' to stamp collectors?\",
    \"answers\":[
      \"stamps issued privately, such as Christmas seals\",
      \"stamps that look unattractive but have a high value\",
      \"stamps that look attractive but have a low value\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What does the German word 'Katzenjammer' mean?\",
    \"answers\":[
      \"bicycle pump\",
      \"hangover\",
      \"mischievous\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which of the following individuals lived to be at least 50 years old.\",
    \"answers\":[
      \"Enrico Caruso\",
      \"Davy Crockett\",
      \"Edith Piaf\",
      \"William Shakespeare\"
    ]
  }",
  "{
    \"question\":\"If you are 'non compos mentis', you are what?\",
    \"answers\":[
      \"financially destitute\",
      \"mentally unstable\",
      \"physically repulsive\",
      \"pregnant\"
    ]
  }",
  "{
    \"question\":\"The Wimbledon tennis tournament is played on what kind of surface?\",
    \"answers\":[
      \"clay\",
      \"grass\",
      \"asphalt\",
      \"cement\"
    ]
  }",
  "{
    \"question\":\"What is Myanmar?\",
    \"answers\":[
      \"the country that was formerly called Burma\",
      \"a moon of Neptune discovered in 1989\",
      \"a new kind of 'stick-together' fabric similar to Velcro\",
      \"\"
    ]
  }",
  "{
    \"question\":\"How many of the 2,224 people aboard the S.S. Titanic survived its sinking in 1912?\",
    \"answers\":[
      \"none\",
      \"about a third\",
      \"about two-thirds\",
      \"all but one\"
    ]
  }",
  "{
    \"question\":\"If you drive from Canada to Mexico, what is the least number of states you must pass through?\",
    \"answers\":[
      \"3\",
      \"4\",
      \"C.5\",
      \"6\"
    ]
  }",
  "{
    \"question\":\"Which car company advertises its cars as being 'the ultimate driving machine'?\",
    \"answers\":[
      \"BMW\",
      \"Mercedes\",
      \"Volkswagen\",
      \"Volvo\"
    ]
  }",
  "{
    \"question\":\"Where would you see a 'flying buttress'?\",
    \"answers\":[
      \"at an airport\",
      \"at a football game\",
      \"on a building\",
      \"underwater\"
    ]
  }",
  "{
    \"question\":\"Approximately when did the world population reach 100 million people?\",
    \"answers\":[
      \"15,000 B.C.\",
      \"3,000 B.C.\",
      \"300 A.D.\",
      \"1,500 A.D.\"
    ]
  }",
  "{
    \"question\":\"Who  was the Greek god of love?\",
    \"answers\":[
      \"Cupid\",
      \"Eros\",
      \"Pan\",
      \"\"
    ]
  }",
  "{
    \"question\":\"The Garden of Love, a painting painted in the 1630s, was painted by what artist?\",
    \"answers\":[
      \"Rembrandt\",
      \"Rubens\",
      \"van Dyck\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What is the Latin word for the number six?\",
    \"answers\":[
      \"hex\",
      \"sex\",
      \"six\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which is the correct spelling of the indicated word?\",
    \"answers\":[
      \"milennium\",
      \"millenium\",
      \"millennium*\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Leonard Kristiansen of Norway led the first party to land on the mainland of Antarctica in what year?\",
    \"answers\":[
      \"1795\",
      \"1845\",
      \"1895\",
      \"1945\"
    ]
  }",
  "{
    \"question\":\"Which one of the following centuries was part of the Ming Dynasty in China?\",
    \"answers\":[
      \"5th century B.C.\",
      \"5th century A.D.\",
      \"15th century A.D.\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What century did the French playwrights Racine, Corneille and Moliere all live in?\",
    \"answers\":[
      \"17th\",
      \"18th\",
      \"19th\",
      \"\"
    ]
  }",
  "{
    \"question\":\"The Declaration of Independence was written by whom?\",
    \"answers\":[
      \"Benjamin Franklin\",
      \"Thomas Jefferson\",
      \"James Madison\",
      \"George Washington\"
    ]
  }",
  "{
    \"question\":\"The words 'Indeed I tremble for my country when I reflect that God is just,'  were written by whom?\",
    \"answers\":[
      \"Simon Bolivar\",
      \"George Bernard Shaw\",
      \"Thomas Jefferson\",
      \"\"
    ]
  }",
  "{
    \"question\":\"The movie Ishtar was a flop and was directed by who?\",
    \"answers\":[
      \"Blake Edwards\",
      \"Elaine May\",
      \"Oliver Stone\",
      \"\"
    ]
  }",
  "{
    \"question\":\"In the film Trading Places, what actor's character traded places with Eddie Murphy's character?\",
    \"answers\":[
      \"Dan Ackroyd\",
      \"John Candy\",
      \"Nick Nolte\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What breed of dog was the film star Rin Tin Tin?\",
    \"answers\":[
      \"a collie\",
      \"a German Shepherd\",
      \"a Husky\",
      \"\"
    ]
  }",
  "{
    \"question\":\"In the 1998 comedy film Big Business, who played two pairs of twins?\",
    \"answers\":[
      \"Shelly Long and Bette Midler\",
      \"Bette Midler and Lily Tomlin\",
      \"Lily Tomlin and Shelly Long\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What was Dustin Hoffmans character 's profession in the movie Tootsie?\",
    \"answers\":[
      \"actor\",
      \"clothing-store clerk\",
      \"doctor\",
      \"\"
    ]
  }",
  "{
    \"question\":\"In American films, who was known as 'the Great Profile'?\",
    \"answers\":[
      \"John Barrymore\",
      \"Errol Flynn\",
      \"Marilyn Monroe\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which U.S. city has had Riccardo Muti, Eugene Ormandy, and Leopold Stokowski as the conductors of their city's orchestra?\",
    \"answers\":[
      \"Chicago\",
      \"Philadelphia\",
      \"New York\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which of the following cities is the capital of Iowa?\",
    \"answers\":[
      \"Cedar Rapids\",
      \"Davenport\",
      \"Des Moines\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What state had the highest percentage increase in population from 1980 to 1990?\",
    \"answers\":[
      \"Alaska\",
      \"Arizona\",
      \"Florida\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which state has the official postal abbreviation MI?\",
    \"answers\":[
      \"Michigan\",
      \"Minnesota\",
      \"Mississippi\",
      \"Missouri\"
    ]
  }",
  "{
    \"question\":\"What state is known as the Badger State?\",
    \"answers\":[
      \"Michigan\",
      \"Minnesota\",
      \"Oregon\",
      \"Wisconsin\"
    ]
  }",
  "{
    \"question\":\"What state is the only state that Main has a border with?\",
    \"answers\":[
      \"Massachusetts\",
      \"New Hampshire\",
      \"Vermont\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What California town elected Clint Eastwood mayor?\",
    \"answers\":[
      \"Beverly Hills\",
      \"Carmel\",
      \"Monterey\",
      \"San Jose\"
    ]
  }",
  "{
    \"question\":\"What U.S. city hosted  a World's Fair twice this century both at Flushing Meadows-Corona Park?\",
    \"answers\":[
      \"Chicago\",
      \"New Orleans\",
      \"New York City\",
      \"Seattle Washington\"
    ]
  }",
  "{
    \"question\":\"In what year was the Palace of Governors built in Santa Fe, New Mexico?\",
    \"answers\":[
      \"1610\",
      \"1710\",
      \"1810\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which of the following vegetables is not one of the ingredients of V-8 juice?\",
    \"answers\":[
      \"beet\",
      \"carrot\",
      \"spinach\",
      \"cabbage\"
    ]
  }",
  "{
    \"question\":\"What is the main ingredient in vichyssoise?\",
    \"answers\":[
      \"lima beans\",
      \"clams\",
      \"tomatoes\",
      \"potatoes\"
    ]
  }",
  "{
    \"question\":\"What country produces the most potatoes?\",
    \"answers\":[
      \"China\",
      \"United States\",
      \"Ireland\",
      \"Russia\"
    ]
  }",
  "{
    \"question\":\"What soft-drink company introduced the brand Slice?\",
    \"answers\":[
      \"Dr. Pepper\",
      \"Coca Cola\",
      \"Seven Up\",
      \"Pepsico\"
    ]
  }",
  "{
    \"question\":\"According to a 1980s Beverage Media poll of four hundred bartenders, what is the average male customers favorite drink?\",
    \"answers\":[
      \"beer\",
      \"bourbon\",
      \"scotch\",
      \"vodka\"
    ]
  }",
  "{
    \"question\":\"According to a 1980s Beverage Media poll of four hundred bartenders, what was the female customers favorite drink?\",
    \"answers\":[
      \"beer\",
      \"margarita\",
      \"peach schnapps and orange juice\",
      \"white wine\"
    ]
  }",
  "{
    \"question\":\"Simplesse is NutraSweet's fat substitute.  What is it made of?\",
    \"answers\":[
      \"a blend of proteins from egg white and milk\",
      \"fat molecules altered to be too large to digest\",
      \"molecules that are the mirror-image of normal fat molecules\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which grade of olive oil is considered the best?\",
    \"answers\":[
      \"extra virgin\",
      \"pure virgin\",
      \"superfine virgin\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What vegetable has varieties known as Bell Tower, Orobelle, and Jupiter?\",
    \"answers\":[
      \"Onion\",
      \"pepper\",
      \"squash\",
      \"\"
    ]
  }",
  "{
    \"question\":\"In the drink called a zombie, what is the main alcoholic ingredient?\",
    \"answers\":[
      \"beer\",
      \"brandy\",
      \"rum\",
      \"whiskey\"
    ]
  }",
  "{
    \"question\":\"Of the following dishes, which are not typically made with some kind of seafood?\",
    \"answers\":[
      \"Bouillabaisse\",
      \"osso buco\",
      \"fritto misto\",
      \"tempura\"
    ]
  }",
  "{
    \"question\":\"Which of the following ingredients are not used in a Bloody Mary according to Playboy Bar Guide?\",
    \"answers\":[
      \"ketchup\",
      \"sugar\",
      \"Tabasco sauce\",
      \"Worcestershire sauce\"
    ]
  }",
  "{
    \"question\":\"Which of the following compounds have not been approved for use in the U.S. as an artificial sweetener?\",
    \"answers\":[
      \"acesulfame K\",
      \"acetaminophen\",
      \"aspartame\",
      \"saccharine\"
    ]
  }",
  "{
    \"question\":\"The original Bellini was a mixture of sparkling Italian white wine and what type of fruit juice?\",
    \"answers\":[
      \"apple\",
      \"orange\",
      \"peach\",
      \"pomegranate\"
    ]
  }",
  "{
    \"question\":\"The sandwich known as the 'Reuben' does not have which of the following ingredients?\",
    \"answers\":[
      \"boiled ham\",
      \"corned Beef\",
      \"sauerkraut\",
      \"Swiss Cheese\"
    ]
  }",
  "{
    \"question\":\"Marzipan is made with what kind of nut?\",
    \"answers\":[
      \"almond\",
      \"cashew\",
      \"pecan\",
      \"walnut\"
    ]
  }",
  "{
    \"question\":\"Which of the following is not a favorable adjective when discussing wine?\",
    \"answers\":[
      \"fat\",
      \"flinty\",
      \"leggy\",
      \"vigorous\"
    ]
  }",
  "{
    \"question\":\"Of all commercial cooking oils, which of these is highest in polyunsaturates  and lowest in saturated fat?\",
    \"answers\":[
      \"coconut oil\",
      \"corn oil\",
      \"olive oil\",
      \"safflower oil\"
    ]
  }",
  "{
    \"question\":\"In the United States, about how much beer does the average person drink each year?\",
    \"answers\":[
      \"24 pints\",
      \"24 quarts\",
      \"24 gallons\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Europeans first learned of chocolate from whom?\",
    \"answers\":[
      \"Africans\",
      \"Aztecs\",
      \"East Indians\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What was the average life expectancy of white males born in the U.S. just before the Civil War?\",
    \"answers\":[
      \"40 years\",
      \"50 years\",
      \"60 years\",
      \"70 years\"
    ]
  }",
  "{
    \"question\":\"Which one of the following instruments is used to measure humidity?\",
    \"answers\":[
      \"anemometer\",
      \"ammeter\",
      \"hygrometer\",
      \"barometer\"
    ]
  }",
  "{
    \"question\":\"Which two planets are most similar in size diameter wise?\",
    \"answers\":[
      \"Mars and Mercury\",
      \"Venus and Earth\",
      \"Uranus and Neptune\",
      \"Jupiter and Saturn\"
    ]
  }",
  "{
    \"question\":\"If a hertz is equal to one cylce per second, how manyh cycles per second does a megahertz  equal?\",
    \"answers\":[
      \"1/1,000\",
      \"1,000\",
      \"1,000,000\",
      \"1,000,000,000\"
    ]
  }",
  "{
    \"question\":\"What principle explains why cold food warms up and hot food cools off when stored at room temperature?\",
    \"answers\":[
      \"entropy\",
      \"chemical equilibrium\",
      \"momentum\",
      \"relativity\"
    ]
  }",
  "{
    \"question\":\"Which color is not considered to be one of the primary colors of light?\",
    \"answers\":[
      \"Red\",
      \"yellow\",
      \"green\",
      \"blue\"
    ]
  }",
  "{
    \"question\":\"What causes the disease toxoplasmosis?\",
    \"answers\":[
      \"A bacterium\",
      \"a protozoan\",
      \"a virus\",
      \"a prion\"
    ]
  }",
  "{
    \"question\":\"What is the slowest wind speed a hurricane can have according to the Saffir-Simpson scale?\",
    \"answers\":[
      \"50 m.p.h.\",
      \"74 m.p.h.\",
      \"96 m.p.h.\",
      \"110 m.p.h.\"
    ]
  }",
  "{
    \"question\":\"Which of the following heavenly bodies have never had a spacecraft landed on it?\",
    \"answers\":[
      \"Venus\",
      \"Mars\",
      \"the moon\",
      \"Jupiter\"
    ]
  }",
  "{
    \"question\":\"Meat should be kept frozen at what temperature in degrees Fahrenheit?\",
    \"answers\":[
      \"up to 250\",
      \"up to 25,000\",
      \"up to 2,500,000\",
      \"up to 250,000,000\"
    ]
  }",
  "{
    \"question\":\"In which kind of geometry is the sum of the angles inside a triangle exactly equal to 180 degrees?\",
    \"answers\":[
      \"elliptical\",
      \"Euclidean\",
      \"hyperbolic\",
      \"linear\"
    ]
  }",
  "{
    \"question\":\"What is the name of the disease that has been referred to as the 'disease of kings'?\",
    \"answers\":[
      \"hemophilia\",
      \"jaundice\",
      \"rubella\",
      \"syphilis\"
    ]
  }",
  "{
    \"question\":\"What disease causes a buildup of fluid pressure in the eyeball and damages the optic nerve at the back of the eye?\",
    \"answers\":[
      \"astigmatism\",
      \"cataract\",
      \"glaucoma\",
      \"retinitis\"
    ]
  }",
  "{
    \"question\":\"What would be the most likely thing one would do with the compound MgSO4 7H2O?\",
    \"answers\":[
      \"power a car\",
      \"blow up a building\",
      \"soak ones feet\",
      \"fertilize a lawn\"
    ]
  }",
  "{
    \"question\":\"Amps are a unit of measurement of what?\",
    \"answers\":[
      \"electric charge\",
      \"electric current\",
      \"electric field strength\",
      \"electric potential\"
    ]
  }",
  "{
    \"question\":\" In which century was the greatest number of chemical elements discovered?\",
    \"answers\":[
      \"17th\",
      \"18th\",
      \"19th\",
      \"20th\"
    ]
  }",
  "{
    \"question\":\"Louis Pasteur developed which vaccine?\",
    \"answers\":[
      \"polio\",
      \"rabies\",
      \"smallpox\",
      \"anthrax\"
    ]
  }",
  "{
    \"question\":\"Which character,in the Wizard of Oz,does Dorothy say she'll miss 'most of all' when she leaves Oz?\",
    \"answers\":[
      \"The Wizard\",
      \"The Scarecrow\",
      \"The Cowardly Lion\",
      \"\"
    ]
  }",
  "{
    \"question\":\"The Philadelphia mint started putting a 'P' mint mark on quarters when?\",
    \"answers\":[
      \"1960\",
      \"1980\",
      \"never\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Before becoming George Bush's Secretary of Defense, what was Dick Cheney's position?\",
    \"answers\":[
      \"congressman from Wyoming\",
      \"governor of New Hampshire\",
      \"secretary of defense under Ronald Reagan\",
      \"\"
    ]
  }",
  "{
    \"question\":\"When Mt. St. Helens erupted on May 18, 1980, how many people were killed?\",
    \"answers\":[
      \"1\",
      \"57\",
      \"571\",
      \"\"
    ]
  }",
  "{
    \"question\":\"In J. Edgar Hoover, what did the J stand for?\",
    \"answers\":[
      \"James\",
      \"John\",
      \"Joseph\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Florence Nightingale became known as 'the Lady With the Lamp' during which war?\",
    \"answers\":[
      \"American Civil War\",
      \"Crimean War\",
      \"World War I\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What year was it that the Census Bureau first reported that a majority of new mothers  were remaining in the new job market?\",
    \"answers\":[
      \"1968\",
      \"1978\",
      \"1988\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Of civil war fame, John Brown was what?\",
    \"answers\":[
      \"an abolitionist\",
      \"a slave\",
      \"a slave-owner\",
      \"\"
    ]
  }",
  "{
    \"question\":\"The capital of the American Virgin Islands is what city?\",
    \"answers\":[
      \"Agana\",
      \"Charlotte Amalie\",
      \"Pago Pago\",
      \"\"
    ]
  }",
  "{
    \"question\":\"How much does Plymouth Rock weigh?\",
    \"answers\":[
      \"4 tons\",
      \"40 tons\",
      \"400 tons\"
    ]
  }",
  "{
    \"question\":\"How much of an increase was there in households owning VCRs from 1985 to 1990?\",
    \"answers\":[
      \"doubled\",
      \"tripled\",
      \"quadrupled\"
    ]
  }",
  "{
    \"question\":\"A group of investors bought the London Bridge in the 60s for $2.5 million.  Where did they move it to?\",
    \"answers\":[
      \"Lake Havasu City, Arizona\",
      \"Peoria, Illinois\",
      \"Truth or Consequences, New Mexico\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Federal Express has its headquarters located in what city?\",
    \"answers\":[
      \"Chicago\",
      \"Kansas City\",
      \"Memphis\",
      \"\"
    ]
  }",
  "{
    \"question\":\"The U.S. Constitution and the Declaration of Independence are sealed in glass cases filled with which type of gas?\",
    \"answers\":[
      \"carbon dioxide\",
      \"helium\",
      \"nitrogen\",
      \"\"
    ]
  }",
  "{
    \"question\":\"At the 1988 Democratic Convention the keynote speaker was Ann Richards. What office did she hold at the time?\",
    \"answers\":[
      \"governor of Kentucky\",
      \"state treasurer of Texas\",
      \"U.S. senator from Missouri\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Who once said publicly, 'Sometimes you have to go above the written law?\",
    \"answers\":[
      \"Al Capone\",
      \"G. Gordon Liddy\",
      \"Fawn Hall\",
      \"Jimmy Swaggart\"
    ]
  }",
  "{
    \"question\":\"Approximately what was the population of the United States in 1990?\",
    \"answers\":[
      \"225 million\",
      \"250 million\",
      \"275 million\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What time is it in Honolulu, Hawaii, when it's noon in Los Angeles, California if both are on standard time?\",
    \"answers\":[
      \"8 a.m.\",
      \"10 a.m.\",
      \"2 p.m.\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Barbie dolls are manufactured by what company?\",
    \"answers\":[
      \"Hasbro\",
      \"Lewis Galoob Toys\",
      \"Mattel\",
      \"Milton Bradley\"
    ]
  }",
  "{
    \"question\":\"The Gunpowder Plot conspirators tried to kill what ruler along with members of Parliament in 1605?\",
    \"answers\":[
      \"Charles I\",
      \"Elizabeth I\",
      \"Henry VIII\",
      \"James I\"
    ]
  }",
  "{
    \"question\":\"Who enters the annual Van Cliburn International  Competition?\",
    \"answers\":[
      \"chefs\",
      \"chess players\",
      \"pianists\",
      \"squash players\"
    ]
  }",
  "{
    \"question\":\"Which of the following countries does not border Israel?\",
    \"answers\":[
      \"Egypt\",
      \"Jordan\",
      \"Saudi Arabia\",
      \"Syria\"
    ]
  }",
  "{
    \"question\":\"What European capital city is located at the mouth of the Liffey River?\",
    \"answers\":[
      \"Amsterdam\",
      \"Copenhagen\",
      \"Dublin\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Mount Erebus is what?\",
    \"answers\":[
      \"an active volcano in the Antarctica\",
      \"an underwater peak off Greece that is a hazard to Mediterranean shipping\",
      \"a nearly 17,000-foot peak on the Iran-Turkey border, where Noah's Ark  may have landed.\"
    ]
  }",
  "{
    \"question\":\"Who wrote some of the Flash Gordon comic strips that appeared in Europe during World War II?\",
    \"answers\":[
      \"Buster Crabbe\",
      \"Charles DeGaulle\",
      \"Federico Fellini\",
      \"Hermann Hesse\"
    ]
  }",
  "{
    \"question\":\"When added together, which two countries have over 90 percent of the world's platinum reserves?\",
    \"answers\":[
      \"Australia and south Africa\",
      \"Canada and the United States\",
      \"South Africa and the Soviet Union\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What two countries border the Dead Sea?\",
    \"answers\":[
      \"Israel and Egypt\",
      \"Israel and Jordan\",
      \"Jordan and Saudi Arabia\",
      \"\"
    ]
  }",
  "{
    \"question\":\"What industry supplies Botswana with more than 75% of its total revenue?\",
    \"answers\":[
      \"cattle\",
      \"coffee\",
      \"diamonds\",
      \"tourism\"
    ]
  }",
  "{
    \"question\":\"Jack the Ripper terrorized what city in the 19th century?\",
    \"answers\":[
      \"Belfast\",
      \"London\",
      \"New York\",
      \"San Francisco\"
    ]
  }",
  "{
    \"question\":\"The United Nations had 51 members when i was founded in 1945. How many members does it have now?\",
    \"answers\":[
      \"59\",
      \"109\",
      \"159\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which actor starred in The Color of Money?\",
    \"answers\":[
      \"Tom  Berenger\",
      \"Tom Cruise\",
      \"Tom Hanks\",
      \"\"
    ]
  }",
  "{
    \"question\":\"The actor Mel Gibson was born where?\",
    \"answers\":[
      \"Birmingham, England\",
      \"Peekskill, New York\",
      \"Wagga Wagga Australia\",
      \"\"
    ]
  }",
  "{
    \"question\":\"Which actor has the real name of Charles Carter?\",
    \"answers\":[
      \"Chuck Norris\",
      \"Charles Atlas\",
      \"Charlton Heston\",
      \"Jimmy Carter\"
    ]
  }",
  "{
    \"question\":\"Susan Lucci was nominated 10 times in the 1980s for a daytime Emmy Award. How many times did she win?\",
    \"answers\":[
      \"0\",
      \"5\",
      \"10\",
      \"\"
    ]
  }",
  "{
    \"question\":\"In 1988, what TV talk-show host had a house torn down that he had bought recently for over 6 million dollars?\",
    \"answers\":[
      \"Johnny Carson\",
      \"Jay Leno\",
      \"Phil Donahue\",
      \"David Letterman\"]
    }"]


user_idx = 1
@questions.each do |question|
  temp = JSON.parse(question)
  poll = Poll.create!(text:temp['question'], user_id: user_idx, chart: [1,2,3,4].sample, format: 1)
  temp['answers'].each do |answer|
    next if answer.length == 0
    responders = []
    answer = Answer.create!(poll_id: poll.id, text: answer)
    (1..60).to_a.sample.times do |idx|
      uid = (1..20).to_a.sample
      if uid != user_idx && !responders.include?(uid)
        Response.create!(respondent_id: uid, answer_id: answer.id)
        responders << uid
      end
    end
  end
  user_idx += 1
  if user_idx > 20
    user_idx = 1
  end
end
