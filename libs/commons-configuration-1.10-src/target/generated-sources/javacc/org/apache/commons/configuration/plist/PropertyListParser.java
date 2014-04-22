/* Generated By:JavaCC: Do not edit this line. PropertyListParser.java */
package org.apache.commons.configuration.plist;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

import org.apache.commons.configuration.HierarchicalConfiguration;
import org.apache.commons.configuration.HierarchicalConfiguration.Node;

import org.apache.commons.codec.binary.Hex;

/**
 * JavaCC based parser for the PropertyList format.
 *
 * @author Emmanuel Bourg
 * @version $Revision$, $Date$
 */
class PropertyListParser implements PropertyListParserConstants {

    /**
     * Remove the quotes at the beginning and at the end of the specified String.
     */
    protected String removeQuotes(String s)
    {
        if (s == null)
        {
            return null;
        }

        if (s.startsWith("\u005c"") && s.endsWith("\u005c"") && s.length() >= 2)
        {
            s = s.substring(1, s.length() - 1);
        }

        return s;
    }

    protected String unescapeQuotes(String s)
    {
        return s.replaceAll("\u005c\u005c\u005c\u005c\u005c"", "\u005c"");
    }

    /**
     * Remove the white spaces and the data delimiters from the specified
     * string and parse it as a byte array.
     */
    protected byte[] filterData(String s) throws ParseException
    {
        if (s == null)
        {
            return null;
        }

        // remove the delimiters
        if (s.startsWith("<") && s.endsWith(">") && s.length() >= 2)
        {
            s = s.substring(1, s.length() - 1);
        }

        // remove the white spaces
        s = s.replaceAll("\u005c\u005cs", "");

        // add a leading 0 to ensure well formed bytes
        if (s.length() % 2 != 0)
        {
            s = "0" + s;
        }

        // parse and return the bytes
        try
        {
            return Hex.decodeHex(s.toCharArray());
        }
        catch (Exception e)
        {
            throw (ParseException) new ParseException("Unable to parse the byte[] : " + e.getMessage());
        }
    }

    /**
     * Parse a date formatted as <*D2002-03-22 11:30:00 +0100>
     */
    protected Date parseDate(String s) throws ParseException
    {
        return PropertyListConfiguration.parseDate(s);
    }

  final public PropertyListConfiguration parse() throws ParseException {
    PropertyListConfiguration configuration = null;
    configuration = Dictionary();
    jj_consume_token(0);
      {if (true) return configuration;}
    throw new Error("Missing return statement in function");
  }

  final public PropertyListConfiguration Dictionary() throws ParseException {
    PropertyListConfiguration configuration = new PropertyListConfiguration();
    List<Node> children = new ArrayList<Node>();
    Node child = null;
    jj_consume_token(DICT_BEGIN);
    label_1:
    while (true) {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case STRING:
      case QUOTED_STRING:
        ;
        break;
      default:
        jj_la1[0] = jj_gen;
        break label_1;
      }
      child = Property();
            if (child.getValue() instanceof HierarchicalConfiguration)
            {
                // prune & graft the nested configuration to the parent configuration
                HierarchicalConfiguration conf = (HierarchicalConfiguration) child.getValue();
                Node root = conf.getRoot();
                root.setName(child.getName());
                children.add(root);
            }
            else
            {
                children.add(child);
            }
    }
    jj_consume_token(DICT_END);
        for (int i = 0; i < children.size(); i++)
        {
            child = children.get(i);
            configuration.getRoot().addChild(child);
        }

        {if (true) return configuration;}
    throw new Error("Missing return statement in function");
  }

  final public Node Property() throws ParseException {
    String key = null;
    Object value = null;
    Node node = new Node();
    key = String();
      node.setName(key);
    jj_consume_token(EQUAL);
    value = Element();
      node.setValue(value);
    switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
    case DICT_SEPARATOR:
      jj_consume_token(DICT_SEPARATOR);
      break;
    default:
      jj_la1[1] = jj_gen;
      ;
    }
      {if (true) return node;}
    throw new Error("Missing return statement in function");
  }

  final public Object Element() throws ParseException {
    Object value = null;
    if (jj_2_1(2)) {
      value = Array();
      {if (true) return value;}
    } else {
      switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
      case DICT_BEGIN:
        value = Dictionary();
      {if (true) return value;}
        break;
      case STRING:
      case QUOTED_STRING:
        value = String();
      {if (true) return value;}
        break;
      case DATA:
        value = Data();
      {if (true) return value;}
        break;
      case DATE:
        value = Date();
      {if (true) return value;}
        break;
      default:
        jj_la1[2] = jj_gen;
        jj_consume_token(-1);
        throw new ParseException();
      }
    }
    throw new Error("Missing return statement in function");
  }

  final public List Array() throws ParseException {
    List<Object> list = new ArrayList<Object>();
    Object element = null;
    jj_consume_token(ARRAY_BEGIN);
    switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
    case ARRAY_BEGIN:
    case DICT_BEGIN:
    case DATA:
    case DATE:
    case STRING:
    case QUOTED_STRING:
      element = Element();
          list.add(element);
      label_2:
      while (true) {
        switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
        case ARRAY_SEPARATOR:
          ;
          break;
        default:
          jj_la1[3] = jj_gen;
          break label_2;
        }
        jj_consume_token(ARRAY_SEPARATOR);
        element = Element();
              list.add(element);
      }
      break;
    default:
      jj_la1[4] = jj_gen;
      ;
    }
    jj_consume_token(ARRAY_END);
      {if (true) return list;}
    throw new Error("Missing return statement in function");
  }

  final public String String() throws ParseException {
    Token token = null;
    String value = null;
    switch ((jj_ntk==-1)?jj_ntk():jj_ntk) {
    case QUOTED_STRING:
      token = jj_consume_token(QUOTED_STRING);
      {if (true) return unescapeQuotes(removeQuotes(token.image));}
      break;
    case STRING:
      token = jj_consume_token(STRING);
      {if (true) return token.image;}
      break;
    default:
      jj_la1[5] = jj_gen;
      jj_consume_token(-1);
      throw new ParseException();
    }
    throw new Error("Missing return statement in function");
  }

  final public byte[] Data() throws ParseException {
    Token token;
    token = jj_consume_token(DATA);
      {if (true) return filterData(token.image);}
    throw new Error("Missing return statement in function");
  }

  final public Date Date() throws ParseException {
    Token token;
    token = jj_consume_token(DATE);
      {if (true) return parseDate(token.image);}
    throw new Error("Missing return statement in function");
  }

  private boolean jj_2_1(int xla) {
    jj_la = xla; jj_lastpos = jj_scanpos = token;
    try { return !jj_3_1(); }
    catch(LookaheadSuccess ls) { return true; }
    finally { jj_save(0, xla); }
  }

  private boolean jj_3_1() {
    if (jj_3R_3()) return true;
    return false;
  }

  private boolean jj_3R_5() {
    Token xsp;
    xsp = jj_scanpos;
    if (jj_3_1()) {
    jj_scanpos = xsp;
    if (jj_3R_6()) {
    jj_scanpos = xsp;
    if (jj_3R_7()) {
    jj_scanpos = xsp;
    if (jj_3R_8()) {
    jj_scanpos = xsp;
    if (jj_3R_9()) return true;
    }
    }
    }
    }
    return false;
  }

  private boolean jj_3R_14() {
    if (jj_scan_token(QUOTED_STRING)) return true;
    return false;
  }

  private boolean jj_3R_11() {
    Token xsp;
    xsp = jj_scanpos;
    if (jj_3R_14()) {
    jj_scanpos = xsp;
    if (jj_3R_15()) return true;
    }
    return false;
  }

  private boolean jj_3R_13() {
    if (jj_scan_token(DATE)) return true;
    return false;
  }

  private boolean jj_3R_10() {
    if (jj_scan_token(DICT_BEGIN)) return true;
    return false;
  }

  private boolean jj_3R_9() {
    if (jj_3R_13()) return true;
    return false;
  }

  private boolean jj_3R_8() {
    if (jj_3R_12()) return true;
    return false;
  }

  private boolean jj_3R_12() {
    if (jj_scan_token(DATA)) return true;
    return false;
  }

  private boolean jj_3R_7() {
    if (jj_3R_11()) return true;
    return false;
  }

  private boolean jj_3R_4() {
    if (jj_3R_5()) return true;
    return false;
  }

  private boolean jj_3R_6() {
    if (jj_3R_10()) return true;
    return false;
  }

  private boolean jj_3R_15() {
    if (jj_scan_token(STRING)) return true;
    return false;
  }

  private boolean jj_3R_3() {
    if (jj_scan_token(ARRAY_BEGIN)) return true;
    Token xsp;
    xsp = jj_scanpos;
    if (jj_3R_4()) jj_scanpos = xsp;
    if (jj_scan_token(ARRAY_END)) return true;
    return false;
  }

  /** Generated Token Manager. */
  public PropertyListParserTokenManager token_source;
  SimpleCharStream jj_input_stream;
  /** Current token. */
  public Token token;
  /** Next token. */
  public Token jj_nt;
  private int jj_ntk;
  private Token jj_scanpos, jj_lastpos;
  private int jj_la;
  private int jj_gen;
  final private int[] jj_la1 = new int[6];
  static private int[] jj_la1_0;
  static {
      jj_la1_init_0();
   }
   private static void jj_la1_init_0() {
      jj_la1_0 = new int[] {0x18000000,0x10000,0x1e004000,0x2000,0x1e004800,0x18000000,};
   }
  final private JJCalls[] jj_2_rtns = new JJCalls[1];
  private boolean jj_rescan = false;
  private int jj_gc = 0;

  /** Constructor with InputStream. */
  public PropertyListParser(java.io.InputStream stream) {
     this(stream, null);
  }
  /** Constructor with InputStream and supplied encoding */
  public PropertyListParser(java.io.InputStream stream, String encoding) {
    try { jj_input_stream = new SimpleCharStream(stream, encoding, 1, 1); } catch(java.io.UnsupportedEncodingException e) { throw new RuntimeException(e); }
    token_source = new PropertyListParserTokenManager(jj_input_stream);
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 6; i++) jj_la1[i] = -1;
    for (int i = 0; i < jj_2_rtns.length; i++) jj_2_rtns[i] = new JJCalls();
  }

  /** Reinitialise. */
  public void ReInit(java.io.InputStream stream) {
     ReInit(stream, null);
  }
  /** Reinitialise. */
  public void ReInit(java.io.InputStream stream, String encoding) {
    try { jj_input_stream.ReInit(stream, encoding, 1, 1); } catch(java.io.UnsupportedEncodingException e) { throw new RuntimeException(e); }
    token_source.ReInit(jj_input_stream);
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 6; i++) jj_la1[i] = -1;
    for (int i = 0; i < jj_2_rtns.length; i++) jj_2_rtns[i] = new JJCalls();
  }

  /** Constructor. */
  public PropertyListParser(java.io.Reader stream) {
    jj_input_stream = new SimpleCharStream(stream, 1, 1);
    token_source = new PropertyListParserTokenManager(jj_input_stream);
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 6; i++) jj_la1[i] = -1;
    for (int i = 0; i < jj_2_rtns.length; i++) jj_2_rtns[i] = new JJCalls();
  }

  /** Reinitialise. */
  public void ReInit(java.io.Reader stream) {
    jj_input_stream.ReInit(stream, 1, 1);
    token_source.ReInit(jj_input_stream);
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 6; i++) jj_la1[i] = -1;
    for (int i = 0; i < jj_2_rtns.length; i++) jj_2_rtns[i] = new JJCalls();
  }

  /** Constructor with generated Token Manager. */
  public PropertyListParser(PropertyListParserTokenManager tm) {
    token_source = tm;
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 6; i++) jj_la1[i] = -1;
    for (int i = 0; i < jj_2_rtns.length; i++) jj_2_rtns[i] = new JJCalls();
  }

  /** Reinitialise. */
  public void ReInit(PropertyListParserTokenManager tm) {
    token_source = tm;
    token = new Token();
    jj_ntk = -1;
    jj_gen = 0;
    for (int i = 0; i < 6; i++) jj_la1[i] = -1;
    for (int i = 0; i < jj_2_rtns.length; i++) jj_2_rtns[i] = new JJCalls();
  }

  private Token jj_consume_token(int kind) throws ParseException {
    Token oldToken;
    if ((oldToken = token).next != null) token = token.next;
    else token = token.next = token_source.getNextToken();
    jj_ntk = -1;
    if (token.kind == kind) {
      jj_gen++;
      if (++jj_gc > 100) {
        jj_gc = 0;
        for (int i = 0; i < jj_2_rtns.length; i++) {
          JJCalls c = jj_2_rtns[i];
          while (c != null) {
            if (c.gen < jj_gen) c.first = null;
            c = c.next;
          }
        }
      }
      return token;
    }
    token = oldToken;
    jj_kind = kind;
    throw generateParseException();
  }

  static private final class LookaheadSuccess extends java.lang.Error { }
  final private LookaheadSuccess jj_ls = new LookaheadSuccess();
  private boolean jj_scan_token(int kind) {
    if (jj_scanpos == jj_lastpos) {
      jj_la--;
      if (jj_scanpos.next == null) {
        jj_lastpos = jj_scanpos = jj_scanpos.next = token_source.getNextToken();
      } else {
        jj_lastpos = jj_scanpos = jj_scanpos.next;
      }
    } else {
      jj_scanpos = jj_scanpos.next;
    }
    if (jj_rescan) {
      int i = 0; Token tok = token;
      while (tok != null && tok != jj_scanpos) { i++; tok = tok.next; }
      if (tok != null) jj_add_error_token(kind, i);
    }
    if (jj_scanpos.kind != kind) return true;
    if (jj_la == 0 && jj_scanpos == jj_lastpos) throw jj_ls;
    return false;
  }


/** Get the next Token. */
  final public Token getNextToken() {
    if (token.next != null) token = token.next;
    else token = token.next = token_source.getNextToken();
    jj_ntk = -1;
    jj_gen++;
    return token;
  }

/** Get the specific Token. */
  final public Token getToken(int index) {
    Token t = token;
    for (int i = 0; i < index; i++) {
      if (t.next != null) t = t.next;
      else t = t.next = token_source.getNextToken();
    }
    return t;
  }

  private int jj_ntk() {
    if ((jj_nt=token.next) == null)
      return (jj_ntk = (token.next=token_source.getNextToken()).kind);
    else
      return (jj_ntk = jj_nt.kind);
  }

  private java.util.List<int[]> jj_expentries = new java.util.ArrayList<int[]>();
  private int[] jj_expentry;
  private int jj_kind = -1;
  private int[] jj_lasttokens = new int[100];
  private int jj_endpos;

  private void jj_add_error_token(int kind, int pos) {
    if (pos >= 100) return;
    if (pos == jj_endpos + 1) {
      jj_lasttokens[jj_endpos++] = kind;
    } else if (jj_endpos != 0) {
      jj_expentry = new int[jj_endpos];
      for (int i = 0; i < jj_endpos; i++) {
        jj_expentry[i] = jj_lasttokens[i];
      }
      jj_entries_loop: for (java.util.Iterator<?> it = jj_expentries.iterator(); it.hasNext();) {
        int[] oldentry = (int[])(it.next());
        if (oldentry.length == jj_expentry.length) {
          for (int i = 0; i < jj_expentry.length; i++) {
            if (oldentry[i] != jj_expentry[i]) {
              continue jj_entries_loop;
            }
          }
          jj_expentries.add(jj_expentry);
          break jj_entries_loop;
        }
      }
      if (pos != 0) jj_lasttokens[(jj_endpos = pos) - 1] = kind;
    }
  }

  /** Generate ParseException. */
  public ParseException generateParseException() {
    jj_expentries.clear();
    boolean[] la1tokens = new boolean[30];
    if (jj_kind >= 0) {
      la1tokens[jj_kind] = true;
      jj_kind = -1;
    }
    for (int i = 0; i < 6; i++) {
      if (jj_la1[i] == jj_gen) {
        for (int j = 0; j < 32; j++) {
          if ((jj_la1_0[i] & (1<<j)) != 0) {
            la1tokens[j] = true;
          }
        }
      }
    }
    for (int i = 0; i < 30; i++) {
      if (la1tokens[i]) {
        jj_expentry = new int[1];
        jj_expentry[0] = i;
        jj_expentries.add(jj_expentry);
      }
    }
    jj_endpos = 0;
    jj_rescan_token();
    jj_add_error_token(0, 0);
    int[][] exptokseq = new int[jj_expentries.size()][];
    for (int i = 0; i < jj_expentries.size(); i++) {
      exptokseq[i] = jj_expentries.get(i);
    }
    return new ParseException(token, exptokseq, tokenImage);
  }

  /** Enable tracing. */
  final public void enable_tracing() {
  }

  /** Disable tracing. */
  final public void disable_tracing() {
  }

  private void jj_rescan_token() {
    jj_rescan = true;
    for (int i = 0; i < 1; i++) {
    try {
      JJCalls p = jj_2_rtns[i];
      do {
        if (p.gen > jj_gen) {
          jj_la = p.arg; jj_lastpos = jj_scanpos = p.first;
          switch (i) {
            case 0: jj_3_1(); break;
          }
        }
        p = p.next;
      } while (p != null);
      } catch(LookaheadSuccess ls) { }
    }
    jj_rescan = false;
  }

  private void jj_save(int index, int xla) {
    JJCalls p = jj_2_rtns[index];
    while (p.gen > jj_gen) {
      if (p.next == null) { p = p.next = new JJCalls(); break; }
      p = p.next;
    }
    p.gen = jj_gen + xla - jj_la; p.first = token; p.arg = xla;
  }

  static final class JJCalls {
    int gen;
    Token first;
    int arg;
    JJCalls next;
  }

}
