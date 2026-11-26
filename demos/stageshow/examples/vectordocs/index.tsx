import {
  Bar,
  Collapse,
  Field,
  Stage,
  States,
  Stream,
  Text,
  Window,
  type Act,
} from "../../kit";
import "./chat.css";

// An assistant answering in a desktop window. Beats: a question is typed into
// the composer and sent; it lands as the user's message; a short Thinking
// state; the answer streams in word by word; its sources arrive under it.
// Plays once; the still is the payoff.
//
// What makes streaming read:
// - Every word is laid out from the start (Stream), so the answer grows in
//   place: no line reflows, the window never jumps as text arrives.
// - The answer streams fast enough to feel like a model, slow enough to
//   read: about 25 words a second, a beat after Thinking.
// - The sent message carries what follows (Collapse with a drop reveal), so
//   the thread moves as one, and the composer empties as it sends.
// - The earlier turn is placeholder: the eye lands on the last exchange.
//
// Real strings: the question, the answer, the two sources, the placeholder.

const Q = "How does vector search find relevant text?";
const A =
  "Your question is converted into an embedding and compared with stored document chunks. The closest matches provide context for the answer, so retrieval follows meaning rather than exact keywords.";
const WORDS = A.split(" ").length;

type S = {
  draft: string;
  sent: boolean;
  phase: "idle" | "thinking" | "answer";
  words: number;
  sources: boolean;
};

const initial: S = {
  draft: "",
  sent: false,
  phase: "idle",
  words: 0,
  sources: false,
};
const poster: S = {
  draft: "",
  sent: true,
  phase: "answer",
  words: WORDS,
  sources: true,
};

async function script(a: Act<S>) {
  await a.wait(700);
  a.mark("type");
  await a.type("draft", Q, { interval: 38 });
  await a.wait(400);
  await a.key('enter');
  a.mark("send");
  a.put({ sent: true, draft: "" });
  await a.wait(450);
  a.put({ phase: "thinking" });
  await a.wait(1100);
  a.mark("stream");
  a.put({ phase: "answer" });
  for (let i = 1; i <= WORDS; i++) {
    a.put({ words: i });
    await a.wait(40);
  }
  await a.wait(300);
  a.mark("sources");
  a.put({ sources: true });
  await a.wait(2600);
}

export default function AiChat() {
  return (
    <Stage
      width={640}
      height={420}
      compact={{ below: 600, width: 358, height: 342 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      className="ac"
    >
      {(s, _rect, layout) => (
        <Window title="Documents" toolbar={<span style={{fontSize: 11, color: '#696962'}}>PDF</span>} lights="grey" className="ac-win">
          <div className="ac-body">
            <div className="ac-thread">
              <div className="ac-turn ac-turn--past">
                <div className="document-context"><span>Document ready</span><strong>Vector search notes.pdf</strong><p>Ask a question about this document.</p></div>
              </div>
              <Collapse open={s.sent} reveal="drop" from="below">
                <div className="ac-q">
                  <Text>{Q}</Text>
                </div>
              </Collapse>
              {/* Thinking is one line; the answer opens to its own height as
                  Thinking closes, so the thread grows once, smoothly, and the
                  earlier turns move up with it. Before the send neither takes
                  any room */}
              <Collapse open={s.phase === 'thinking'}>
                <Text className="ac-thinking">Finding relevant passages…</Text>
              </Collapse>
              <Collapse open={s.phase === 'answer'}>
                <div className="ac-a" data-on>
                  <Stream className="ac-stream" text={layout === 'compact' ? 'Vector search matches your question with relevant document chunks by meaning. Those passages provide context for the answer.' : A} count={s.words} />
                  <div className="ac-sources" data-on={s.sources || undefined}>
                    <span className="ac-source">Source · Vector search notes.pdf</span>
                  </div>
                </div>
              </Collapse>
            </div>
            <Field
              className="ac-composer"
              value={s.draft}
              placeholder="Ask your document"
              focused={!s.sent}
            />
          </div>
        </Window>
      )}
    </Stage>
  );
}
